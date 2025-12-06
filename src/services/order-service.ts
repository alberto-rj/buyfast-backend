import { prisma } from '../config';
import {
  OrderResultOutput,
  OrderCancelInput,
  OrderDetailsOutput,
  OrderGetAllOfInput,
  OrderCreateInput,
  OrderGetInput,
  OrderGetAllInput,
  OrderUpdateStatusInput,
  toOrderOutput,
  toOrderItemOutput,
  toUserBasicOutput,
  OrderGetOfInput,
} from '../dtos';
import { BadRequestError, ConflictError, NotFoundError } from '../utils';
import { OrderStatus } from '@prisma/client';

const generateOrderNumber = async () => {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const count = await prisma.order.count();
  const sequence = (count + 1).toString().padStart(6, '0');
  return `ORD-${date}-${sequence}`;
};

const isValidStatusTransition = (
  currentStatus: OrderStatus,
  newStatus: OrderStatus,
) => {
  const validTransitions: Record<OrderStatus, OrderStatus[]> = {
    [OrderStatus.Pending]: [OrderStatus.Processing, OrderStatus.Cancelled],
    [OrderStatus.Processing]: [OrderStatus.Shipped, OrderStatus.Cancelled],
    [OrderStatus.Shipped]: [OrderStatus.Delivered],
    [OrderStatus.Delivered]: [],
    [OrderStatus.Cancelled]: [],
  };
  return validTransitions[currentStatus].includes(newStatus);
};

const create = async ({
  deliveryAddress,
  userId,
}: OrderCreateInput): Promise<OrderDetailsOutput> => {
  const cartItems = await prisma.cartItem.findMany({
    where: { userId },
    include: { product: true },
  });

  if (cartItems.length === 0) {
    throw new BadRequestError('No item in cart.');
  }

  for (const item of cartItems) {
    const { product } = item;

    if (!product.isActive) {
      throw new BadRequestError(`Product "${product.name}" is not available`);
    }

    if (product.quantity < item.quantity) {
      throw new BadRequestError(
        `Insufficient stock for "${product.name}". Available: ${product.quantity}, requested: ${item.quantity}`,
      );
    }
  }

  const totalAmount = cartItems.reduce((total, item) => {
    return total + Number(item.product.price) * item.quantity;
  }, 0);

  const orderNumber = await generateOrderNumber();

  const createdOrder = await prisma.$transaction(async (tx) => {
    const newOrder = await tx.order.create({
      data: {
        number: orderNumber,
        totalAmount,
        deliveryAddress,
        userId,
      },
      include: {
        items: true,
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    for (const item of cartItems) {
      const totalPrice = Number(item.product.price) * item.quantity;
      await tx.orderItem.create({
        data: {
          unitPrice: item.product.price,
          quantity: item.quantity,
          totalPrice,
          productName: item.product.name,
          productSku: item.product.sku,
          orderId: newOrder.id,
        },
      });

      await tx.product.update({
        data: { quantity: { decrement: item.quantity } },
        where: { id: item.productId },
      });

      await tx.cartItem.deleteMany({
        where: { userId },
      });

      return newOrder;
    }
  });

  if (!createdOrder) {
    throw new BadRequestError('Failed to create order.');
  }

  return {
    ...toOrderOutput(createdOrder),
    items: createdOrder.items.map(toOrderItemOutput),
    user: toUserBasicOutput(createdOrder.user),
  };
};

const updateStatus = async ({
  id,
  status,
}: OrderUpdateStatusInput): Promise<OrderDetailsOutput> => {
  const foundOrder = await prisma.order.findUnique({
    where: { id: id },
    select: {
      status: true,
    },
  });

  if (!foundOrder) {
    throw new NotFoundError('Order not found.');
  }

  if (!isValidStatusTransition(foundOrder.status, status)) {
    throw new ConflictError([
      {
        field: 'status',
        message: `Cannot change status from ${foundOrder.status} to ${status}.`,
      },
    ]);
  }

  const updatedOrder = await prisma.order.update({
    data: {
      status,
    },
    where: {
      id,
    },
    include: {
      items: true,
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    },
  });

  return {
    items: updatedOrder.items.map(toOrderItemOutput),
    user: toUserBasicOutput(updatedOrder.user),
    ...toOrderOutput(updatedOrder),
  };
};

const cancel = async ({
  id,
  userId,
}: OrderCancelInput): Promise<OrderDetailsOutput> => {
  const newStatus = OrderStatus.Cancelled;
  const foundOrder = await prisma.order.findUnique({
    where: { id: id, userId: userId },
    select: {
      status: true,
    },
  });

  if (!foundOrder) {
    throw new NotFoundError('Order not found.');
  }

  if (!isValidStatusTransition(foundOrder.status, newStatus)) {
    throw new ConflictError([
      {
        field: 'status',
        message: `Cannot change status from ${foundOrder.status} to ${newStatus}.`,
      },
    ]);
  }

  const updatedOrder = await prisma.order.update({
    data: {
      status: newStatus,
    },
    where: {
      id,
    },
    include: {
      items: true,
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    },
  });

  return {
    items: updatedOrder.items.map(toOrderItemOutput),
    user: toUserBasicOutput(updatedOrder.user),
    ...toOrderOutput(updatedOrder),
  };
};

const get = async ({ id }: OrderGetInput): Promise<OrderDetailsOutput> => {
  const foundOrder = await prisma.order.findUnique({
    where: { id },
    include: {
      items: true,
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    },
  });

  if (!foundOrder) {
    throw new NotFoundError('Order not found.');
  }

  return {
    items: foundOrder.items.map(toOrderItemOutput),
    user: toUserBasicOutput(foundOrder.user),
    ...toOrderOutput(foundOrder),
  };
};

const getAll = async ({
  status,
  userId,
  page,
  limit,
  sortBy,
  order,
}: OrderGetAllInput): Promise<OrderDetailsOutput[]> => {
  const foundOrders = await prisma.order.findMany({
    where: {
      status,
      userId,
    },
    include: {
      items: true,
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    },
    orderBy: {
      [sortBy]: order,
    },
    skip: (page - 1) * limit,
    take: limit,
  });

  return foundOrders.map((order) => {
    return {
      items: order.items.map(toOrderItemOutput),
      user: toUserBasicOutput(order.user),
      ...toOrderOutput(order),
    };
  });
};

const getAllOf = async ({
  status,
  userId,
  page,
  limit,
  sortBy,
  order,
}: OrderGetAllOfInput): Promise<OrderResultOutput[]> => {
  const foundOrders = await prisma.order.findMany({
    where: {
      status,
      userId: userId,
    },
    include: {
      items: true,
    },
    orderBy: {
      [sortBy]: order,
    },
    skip: (page - 1) * limit,
    take: limit,
  });

  return foundOrders.map((order) => {
    return {
      items: order.items.map(toOrderItemOutput),
      ...toOrderOutput(order),
    };
  });
};

const getOf = async ({
  id,
  userId,
}: OrderGetOfInput): Promise<OrderResultOutput[]> => {
  const foundOrders = await prisma.order.findMany({
    where: {
      id,
      userId: userId,
    },
    include: {
      items: true,
    },
  });

  if (!foundOrders) {
    throw new NotFoundError('Order not found.');
  }

  return foundOrders.map((order) => {
    return {
      items: order.items.map(toOrderItemOutput),
      ...toOrderOutput(order),
    };
  });
};

export const orderService = {
  cancel,
  create,
  get,
  getOf,
  getAll,
  getAllOf,
  updateStatus,
};
