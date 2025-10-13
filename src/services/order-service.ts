import { prisma } from '../config';
import {
  OrderCreateInput,
  OrderGetInput,
  OrderGetAllInput,
  OrderGetAllOfInput,
  OrderUpdateStatusInput,
} from '../dtos';
import { BadRequestError, ConflictError, NotFoundError } from '../utils';

const generateOrderNumber = async () => {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const count = await prisma.order.count();
  const sequence = (count + 1).toString().padStart(6, '0');
  return `ORD-${date}-${sequence}`;
};

const calculateTaxAmount = ({
  price,
  tax,
  quantity,
}: {
  price: number;
  tax: number;
  quantity: number;
}) => {
  const priceWithTax = (1 + tax) * price;
  return priceWithTax * quantity;
};

const create = async ({
  shippingAddress,
  billingAddress,
  userId,
}: OrderCreateInput) => {
  await prisma.$transaction(async (tx) => {
    const cartItems = await tx.cartItem.findMany({
      where: { userId },
      select: {
        quantity: true,
        product: {
          select: {
            id: true,
            name: true,
            sku: true,
            isActive: true,
            price: true,
            tax: true,
            quantity: true,
          },
        },
      },
    });

    if (cartItems.length === 0) {
      throw new BadRequestError('No item in cart.');
    }

    for (const cartItem of cartItems) {
      if (!cartItem.product.isActive) {
        throw new NotFoundError('Product not found.');
      }
      if (cartItem.product.quantity < cartItem.quantity) {
        throw new ConflictError([
          {
            field: 'quantity',
            message: 'Insufficient stock.',
          },
        ]);
      }
    }

    const subtotal = cartItems.reduce((sum, { product, quantity }) => {
      const price = Number(product.price);
      return sum + price * quantity;
    }, 0);
    const totalTaxAmount = cartItems.reduce((sum, { product, quantity }) => {
      const price = Number(product.price);
      const tax = Number(product.tax);
      return sum + calculateTaxAmount({ price, tax, quantity });
    }, 0);
    const shippingAmount = 0;
    const totalAmount = subtotal + totalTaxAmount + shippingAmount;
    const number = await generateOrderNumber();
    const createdOrder = await tx.order.create({
      data: {
        subtotal,
        shippingAmount,
        totalTaxAmount,
        totalAmount,
        number,
        billingAddress,
        shippingAddress,
        userId,
      },
    });

    const newOrderItems = cartItems.map(({ quantity, product }) => {
      const { name: productName, sku: productSku } = product;
      const price = Number(product.price);
      const tax = Number(product.tax);
      const taxAmount = calculateTaxAmount({ price, tax, quantity });
      const totalPrice = price + taxAmount;

      return {
        orderId: createdOrder.id,
        quantity,
        productName,
        productSku,
        unitPrice: price,
        taxAmount: taxAmount,
        totalPrice: totalPrice,
      };
    });
    const createdItems = await tx.orderItem.createMany({ data: newOrderItems });

    for (const item of cartItems) {
      await tx.product.update({
        where: {
          id: item.product.id,
        },
        data: {
          quantity: { decrement: item.quantity },
        },
      });
    }

    await tx.cartItem.deleteMany({ where: { userId } });

    return { ...createdOrder, items: createdItems };
  });
};

const updateStatus = async ({ id, status }: OrderUpdateStatusInput) => {
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
