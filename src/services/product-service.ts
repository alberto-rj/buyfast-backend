import { ConflictError, canIncludeInactive, NotFoundError } from '../utils';
import { prisma } from '../config';
import {
  ProductCreateInput,
  ProductFindInput,
  ProductFindManyInput,
  ProductRemoveInput,
  ProductUpdateInput,
  ProductUpdateIsActiveInput,
  toProductOutput,
  toProductPaginationOutput,
} from '../dtos';
import { categoryService } from './';

const findById = async ({
  id,
  includeInactive,
}: {
  id: string;
  includeInactive: boolean;
}) => {
  const foundProduct = await prisma.product.findUnique({
    where: { id, isActive: canIncludeInactive(includeInactive) },
  });

  if (!foundProduct) {
    throw new NotFoundError('Product not found.');
  }

  return foundProduct;
};

const find = async ({
  id,
  includeInactive,
  includeCategory,
  includeInactiveCategory,
}: ProductFindInput) => {
  const foundProduct = await prisma.product.findUnique({
    where: {
      id,
      isActive: canIncludeInactive(includeInactive),
      category: {
        isActive: canIncludeInactive(includeInactiveCategory),
      },
    },
    include: {
      category: includeCategory,
    },
  });

  if (!foundProduct) {
    throw new NotFoundError('Product not found.');
  }

  return toProductOutput(foundProduct);
};

const findMany = async ({
  category,
  search,
  minPrice,
  maxPrice,
  minQuantity,
  maxQuantity,
  minWeight,
  maxWeight,
  minCreatedAt,
  maxCreatedAt,
  minUpdatedAt,
  maxUpdatedAt,
  includeInactive,
  includeCategory,
  includeInactiveCategory,
  limit,
  page,
  sortBy,
  order,
}: ProductFindManyInput) => {
  const [total, foundProducts] = await Promise.all([
    prisma.product.count({
      where: {
        isActive: canIncludeInactive(includeInactive),
      },
    }),
    prisma.product.findMany({
      where: {
        createdAt: {
          gte: minCreatedAt,
          lte: maxCreatedAt,
        },
        updatedAt: {
          gte: minUpdatedAt,
          lte: maxUpdatedAt,
        },
        price: {
          gte: minPrice,
          lte: maxPrice,
        },
        quantity: {
          gte: minQuantity,
          lte: maxQuantity,
        },
        weight: {
          gte: minWeight,
          lte: maxWeight,
        },
        isActive: canIncludeInactive(includeInactive),
        category: {
          name: category,
          isActive: canIncludeInactive(includeInactiveCategory),
        },
        OR: [
          {
            name: { contains: search, mode: 'insensitive' },
          },
          {
            description: { contains: search, mode: 'insensitive' },
          },
          {
            sku: { contains: search, mode: 'insensitive' },
          },
          {
            category: {
              name: { contains: search, mode: 'insensitive' },
            },
          },
        ],
      },
      include: {
        category: includeCategory,
      },
      orderBy: {
        [sortBy]: order,
      },
      skip: (page - 1) * limit,
      take: limit,
    }),
  ]);

  return toProductPaginationOutput({
    total,
    limit,
    page,
    resources: foundProducts,
  });
};

const create = async ({
  name,
  description,
  price,
  quantity,
  sku,
  categoryId,
  includeCategory,
  includeInactiveCategory,
}: ProductCreateInput) => {
  const [, foundProduct] = await Promise.all([
    categoryService.find({
      id: categoryId,
      includeInactive: includeInactiveCategory,
    }),
    prisma.product.findUnique({
      where: { sku },
    }),
  ]);

  if (foundProduct) {
    throw new ConflictError([
      { field: 'sku', message: 'sku is already registered.' },
    ]);
  }

  const createdProduct = await prisma.product.create({
    data: {
      name,
      description,
      price,
      quantity,
      sku,
      categoryId,
    },
    include: {
      category: includeCategory,
    },
  });

  return toProductOutput(createdProduct);
};

const update = async ({
  id,
  name,
  price,
  description,
  quantity,
  sku,
  weight,
  dimensions,
  categoryId,
  includeInactive,
  includeCategory,
  includeInactiveCategory,
}: ProductUpdateInput) => {
  // check if the category exists
  await categoryService.find({
    id: categoryId,
    includeInactive: includeInactiveCategory,
  });

  // check if the product exists
  await findById({ id, includeInactive });

  // check if is already registered another product with the same sku provided
  const foundProduct = await prisma.product.findUnique({ where: { sku } });
  const skuAlreadyExists = foundProduct && foundProduct.id !== id;

  if (skuAlreadyExists) {
    throw new ConflictError([
      { field: 'sku', message: 'sku is already registered.' },
    ]);
  }

  const updatedProduct = await prisma.product.update({
    data: {
      name,
      description,
      price,
      quantity,
      weight,
      dimensions,
      sku,
      categoryId,
    },
    where: {
      id,
    },
    include: {
      category: includeCategory,
    },
  });

  return toProductOutput(updatedProduct);
};

const updateIsActive = async ({
  id,
  isActive,
  includeInactive,
  includeCategory,
}: ProductUpdateIsActiveInput) => {
  // check if the product exists
  await findById({ id, includeInactive });

  const updatedProduct = await prisma.product.update({
    data: {
      isActive,
    },
    where: {
      id,
    },
    include: {
      category: includeCategory,
    },
  });

  return toProductOutput(updatedProduct);
};

const remove = async ({ id, includeInactive }: ProductRemoveInput) => {
  // check if the product exists
  await findById({ id, includeInactive });

  await prisma.product.delete({ where: { id } });
};

export const productService = {
  find,
  findMany,
  create,
  remove,
  update,
  updateIsActive,
};
