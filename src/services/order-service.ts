import { prisma } from '../config';
import {
  OrderCreateInput,
  OrderGetInput,
  OrderGetAllInput,
  OrderGetAllOfInput,
  OrderUpdateStatusInput,
  AddressCreateInput,
} from '../dtos';
import { BadRequestError, NotFoundError } from '../utils';

const generateOrderNumber = async () => {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const count = await prisma.order.count();
  const sequence = (count + 1).toString().padStart(6, '0');
  return `ORD-${date}-${sequence}`;
};

const resolveShippingAddress = async ({
  userId,
  shippingAddressId,
  newShippingAddress,
}: OrderCreateInput): Promise<AddressCreateInput> => {
  let shippingAddress: AddressCreateInput;

  if (typeof shippingAddressId !== 'undefined') {
    const savedAddress = await prisma.address.findUnique({
      where: {
        id: shippingAddressId,
        userId,
      },
    });

    if (!savedAddress) {
      throw new NotFoundError('Shipping Address not found.');
    }

    shippingAddress = {
      street: savedAddress.street,
      complement: savedAddress.complement || undefined,
      neighborhood: savedAddress.neighborhood,
      city: savedAddress.city,
      state: savedAddress.state,
      zipCode: savedAddress.zipCode,
      country: savedAddress.country,
    };
  } else if (typeof newShippingAddress !== 'undefined') {
    shippingAddress = newShippingAddress;
    await prisma.address.create({
      data: {
        userId,
        ...newShippingAddress,
      },
    });
  } else {
    throw new NotFoundError('Shipping address is required.');
  }

  return shippingAddress;
};

const resolveBillingAddress = async ({
  userId,
  billingAddressId,
  newShippingAddress,
  newBillingAddress,
  useSameAddressForBilling,
}: OrderCreateInput) => {
  let billingAddress: AddressCreateInput;

  if (useSameAddressForBilling) {
    billingAddress = newShippingAddress as AddressCreateInput;
  } else if (typeof billingAddressId !== 'undefined') {
    const savedAddress = await prisma.address.findUnique({
      where: {
        id: billingAddressId,
        userId,
      },
    });

    if (!savedAddress) {
      throw new NotFoundError('Billing address not found.');
    }

    billingAddress = {
      street: savedAddress.street,
      complement: savedAddress.complement || undefined,
      neighborhood: savedAddress.neighborhood,
      city: savedAddress.city,
      state: savedAddress.state,
      zipCode: savedAddress.zipCode,
      country: savedAddress.country,
    };
  } else if (typeof newBillingAddress !== 'undefined') {
    billingAddress = newBillingAddress;
    await prisma.address.create({
      data: {
        userId,
        ...newBillingAddress,
      },
    });
  } else {
    throw new NotFoundError('Billing address is required.');
  }

  return billingAddress;
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
  userId,
  billingAddressId,
  shippingAddressId,
  newBillingAddress,
  newShippingAddress,
  useSameAddressForBilling,
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
        throw new BadRequestError('Insufficient stock.');
      }
    }

    const shippingAddress = await resolveShippingAddress({
      userId,
      shippingAddressId,
      billingAddressId,
      newShippingAddress,
      newBillingAddress,
      useSameAddressForBilling,
    });

    const billingAddress = await resolveBillingAddress({
      userId,
      shippingAddressId,
      billingAddressId,
      newShippingAddress: shippingAddress,
      newBillingAddress,
      useSameAddressForBilling,
    });

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
        taxAmount,
        totalPrice,
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
