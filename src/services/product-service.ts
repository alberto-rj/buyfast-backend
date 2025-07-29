import { ConflictError, getIsActive, NotFoundError } from '../utils';
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
  const filteredProduct = await prisma.product.findUnique({
    where: { id, isActive: getIsActive(includeInactive) },
  });

  if (!filteredProduct) {
    throw new NotFoundError('Product not found.');
  }

  return filteredProduct;
};

const find = async ({
  id,
  includeInactive,
  includeCategory,
  includeInactiveCategory,
}: ProductFindInput) => {
  const filteredProduct = await prisma.product.findUnique({
    where: {
      id,
      isActive: getIsActive(includeInactive),
      category: {
        isActive: getIsActive(includeInactiveCategory),
      },
    },
    include: {
      category: includeCategory,
    },
  });

  if (!filteredProduct) {
    throw new NotFoundError('Product not found.');
  }

  return toProductOutput(filteredProduct);
};

const findMany = async ({
  category,
  search,
  priceMin,
  priceMax,
  quantityMin,
  quantityMax,
  weightMin,
  weightMax,
  createdAtMin,
  createdAtMax,
  updatedAtMin,
  updatedAtMax,
  includeInactive,
  includeCategory,
  includeInactiveCategory,
  limit,
  page,
  sortBy,
  order,
}: ProductFindManyInput) => {
  const [total, filteredProducts] = await Promise.all([
    prisma.product.count({
      where: {
        isActive: getIsActive(includeInactive),
      },
    }),
    prisma.product.findMany({
      where: {
        createdAt: {
          gte: createdAtMin,
          lte: createdAtMax,
        },
        updatedAt: {
          gte: updatedAtMin,
          lte: updatedAtMax,
        },
        price: {
          gte: priceMin,
          lte: priceMax,
        },
        quantity: {
          gte: quantityMin,
          lte: quantityMax,
        },
        weight: {
          gte: weightMin,
          lte: weightMax,
        },
        isActive: getIsActive(includeInactive),
        category: {
          name: category,
          isActive: getIsActive(includeInactiveCategory),
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
    resources: filteredProducts,
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
  const [, filteredProduct] = await Promise.all([
    categoryService.find({
      id: categoryId,
      includeInactive: includeInactiveCategory,
    }),
    prisma.product.findUnique({
      where: { sku },
    }),
  ]);

  if (filteredProduct) {
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
  const filteredProduct = await prisma.product.findUnique({ where: { sku } });
  const skuAlreadyExists = filteredProduct && filteredProduct.id !== id;

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
