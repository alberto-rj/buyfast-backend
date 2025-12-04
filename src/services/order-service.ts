import { OrderDetailsOutput } from 'src/dtos/order';
import { prisma } from '../config';
import {
  OrderCreateInput,
  OrderGetInput,
  OrderGetAllInput,
  OrderGetAllOfInput,
  OrderUpdateStatusInput,
  toOrderOutput,
  toOrderItemOutput,
  toUserBasicOutput,
} from '../dtos';
import { BadRequestError, NotFoundError } from '../utils';

const generateOrderNumber = async () => {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const count = await prisma.order.count();
  const sequence = (count + 1).toString().padStart(6, '0');
  return `ORD-${date}-${sequence}`;
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
          totalPrice: totalPrice,
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

const updateStatus = async ({ id, status, userId }: OrderUpdateStatusInput) => {
  const foundUser = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
    },
  });

  if (!foundUser) {
    throw new NotFoundError('User not found.');
  }

  const foundOrder = await prisma.order.findUnique({
    where: { id: id },
    select: {
      userId: true,
    },
  });

  if (!foundOrder) {
    throw new NotFoundError('Order not found.');
  }

  const updatedOrder = await prisma.order.update({
    data: {
      status,
    },
    where: {
      id,
    },
  });

  return updatedOrder;
};

const get = async ({ id }: OrderGetInput) => {
  const foundOrder = await prisma.order.findUnique({ where: { id } });

  if (!foundOrder) {
    throw new NotFoundError('Order not found.');
  }

  return foundOrder;
};

const getAllOf = async ({
  userId,
  status,
  page,
  limit,
  sortBy,
  order,
}: OrderGetAllOfInput) => {
  const foundOrders = await prisma.order.findMany({
    where: { userId, status },
    include: {
      items: true,
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          username: true,
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

  return foundOrders;
};

const getAll = async ({
  status,
  page,
  limit,
  sortBy,
  order,
}: OrderGetAllInput) => {
  const foundOrders = await prisma.order.findMany({
    where: {
      status,
    },
    orderBy: {
      [sortBy]: order,
    },
    skip: (page - 1) * limit,
    take: limit,
  });

  return foundOrders;
};

export const orderService = {
  create,
  get,
  getAllOf,
  getAll,
  updateStatus,
};
