import { prisma } from '../config';
import {
  CartAddInput,
  CartRemoveInput,
  CartUpdateInput,
  CartClearInput,
  CartListInput,
  toCartItemPaginationOutput,
  toCartItemOutput,
} from '../dtos';
import { ConflictError, NotFoundError } from '../utils';

const canFindUserAndProduct = async ({
  userId,
  productId,
}: {
  userId: string;
  productId: string;
}) => {
  const [foundUser, foundProduct] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId, isActive: true },
      select: { id: true },
    }),
    prisma.product.findUnique({
      where: { id: productId, isActive: true },
      select: { id: true },
    }),
  ]);

  if (!foundUser || !foundProduct) {
    throw new NotFoundError('User or product not found.');
  }
};

const canAddUserAndProduct = async ({
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
        message: 'userId is already associated with an item.',
      },
      {
        field: 'productId',
        message: 'productId is already associated with an item.',
      },
    ]);
  }
};

const canFind = async ({ id, userId }: { id: string; userId: string }) => {
  const foundItem = await prisma.cartItem.findUnique({
    where: { id, user: { id: userId, isActive: true } },
    select: { id: true },
  });

  if (!foundItem) {
    throw new NotFoundError('Item not found.');
  }
};

const list = async ({ limit, page, userId, includeProduct }: CartListInput) => {
  const foundUser = await prisma.user.findUnique({
    where: { id: userId, isActive: true },
    select: { id: true },
  });

  if (!foundUser) {
    throw new NotFoundError('User not found.');
  }

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

  return toCartItemPaginationOutput({
    total,
    limit,
    page,
    resources: foundItems,
  });
};

const add = async ({
  productId,
  userId,
  quantity,
  includeProduct,
}: CartAddInput) => {
  await Promise.all([
    canFindUserAndProduct({ productId, userId }),
    canAddUserAndProduct({ productId, userId }),
  ]);

  const createdItem = await prisma.cartItem.create({
    data: { quantity, userId, productId },
    include: {
      product: includeProduct,
    },
  });

  return toCartItemOutput(createdItem);
};

const update = async ({
  id,
  userId,
  quantity,
  includeProduct,
}: CartUpdateInput) => {
  await canFind({ id, userId });

  const updatedItem = await prisma.cartItem.update({
    data: { quantity },
    where: { id },
    include: {
      product: includeProduct,
    },
  });

  return toCartItemOutput(updatedItem);
};

const remove = async ({ id, userId }: CartRemoveInput) => {
  await canFind({ id, userId });

  await prisma.cartItem.delete({
    where: { id },
  });
};

const clear = async ({ userId }: CartClearInput) => {
  const foundItem = await prisma.cartItem.findFirst({
    where: { user: { id: userId, isActive: true } },
    select: {
      id: true,
    },
  });

  if (!foundItem) {
    throw new NotFoundError('User not found.');
  }

  await prisma.cartItem.deleteMany({ where: { userId } });
};

export const cartService = {
  add,
  clear,
  list,
  remove,
  update,
};
