import { prisma } from '../config';
import {
  CartAddInput,
  CartRemoveInput,
  CartUpdateInput,
  CartClearInput,
  CartListInput,
  toCartOutput,
  toCartItemOutput,
} from '../dtos';
import { ConflictError, NotFoundError } from '../utils';

const ensureProductExists = async ({ productId }: { productId: string }) => {
  const foundProduct = await prisma.product.findUnique({
    where: { id: productId, isActive: true },
    select: { id: true, quantity: true },
  });

  if (!foundProduct) {
    throw new NotFoundError('User or product not found.');
  }

  return { product: foundProduct };
};

const ensureNewUserAndProduct = async ({
  userId,
  productId,
}: {
  userId: string;
  productId: string;
}) => {
  const foundItem = await prisma.cartItem.findFirst({
    where: {
      AND: [{ userId }, { productId }],
    },
    select: { id: true },
  });

  if (foundItem) {
    throw new ConflictError([
      {
        field: 'userId',
        message: 'Item already in cart.',
      },
      {
        field: 'productId',
        message: 'Item already in cart.',
      },
    ]);
  }
};

const ensureItemExists = async ({ id }: { id: string }) => {
  const foundItem = await prisma.cartItem.findUnique({
    where: { id },
    select: { id: true },
  });

  if (!foundItem) {
    throw new NotFoundError('Cart item not found.');
  }

  return { item: foundItem };
};

const list = async ({ limit, page, userId, includeProduct }: CartListInput) => {
  const [total, foundItems] = await Promise.all([
    prisma.cartItem.count({
      where: {
        userId,
      },
    }),
    prisma.cartItem.findMany({
      where: {
        userId,
      },
      include: {
        product: includeProduct,
      },
      skip: (page - 1) * limit,
      take: limit,
    }),
  ]);

  const subtotal = foundItems.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0,
  );

  return toCartOutput({
    total,
    limit,
    page,
    subtotal,
    resources: foundItems,
  });
};

const add = async ({
  productId,
  userId,
  quantity,
  includeProduct,
}: CartAddInput) => {
  const { product } = await ensureProductExists({ productId });

  await ensureNewUserAndProduct({ productId, userId });

  if (product.quantity < quantity) {
    throw new ConflictError([
      {
        field: 'quantity',
        message: 'Insufficient stock.',
      },
    ]);
  }

  const createdItem = await prisma.cartItem.create({
    data: { quantity, userId, productId },
    include: {
      product: includeProduct,
    },
  });

  return toCartItemOutput(createdItem);
};

const update = async ({ id, quantity, includeProduct }: CartUpdateInput) => {
  await ensureItemExists({ id });

  const updatedItem = await prisma.cartItem.update({
    data: { quantity },
    where: { id },
    include: {
      product: includeProduct,
    },
  });

  return toCartItemOutput(updatedItem);
};

const remove = async ({ id }: CartRemoveInput) => {
  await ensureItemExists({ id });

  await prisma.cartItem.delete({
    where: { id },
  });
};

const clear = async ({ userId }: CartClearInput) => {
  await prisma.cartItem.deleteMany({ where: { userId } });
};

export const cartService = {
  add,
  clear,
  list,
  remove,
  update,
};
