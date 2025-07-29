import { prisma } from '../config';
import {
  CategoryFindInput,
  CategoryFindManyInput,
  CategoryCreateInput,
  CategoryUpdateInput,
  CategoryUpdateIsActiveInput,
  CategoryRemoveInput,
  toCategoryOutput,
  toCategoryPaginationOutput,
} from '../dtos';

import { canIncludeInactive, ConflictError, NotFoundError } from '../utils';

const findById = async ({ id, includeInactive }: CategoryFindInput) => {
  const foundCategory = await prisma.category.findUnique({
    where: { id, isActive: canIncludeInactive(includeInactive) },
  });

  if (!foundCategory) {
    throw new NotFoundError('Category not found.');
  }

  return toCategoryOutput(foundCategory);
};

const find = async ({ id, includeInactive }: CategoryFindInput) => {
  return await findById({ id, includeInactive });
};

const findMany = async ({
  includeInactive,
  minCreatedAt,
  maxCreatedAt,
  minUpdatedAt,
  maxUpdatedAt,
  search,
  sortedBy,
  sortOrder,
  limit,
  page,
}: CategoryFindManyInput) => {
  const [total, foundCategories] = await Promise.all([
    prisma.category.count({
      where: { isActive: canIncludeInactive(includeInactive) },
    }),
    prisma.category.findMany({
      where: {
        isActive: canIncludeInactive(includeInactive),
        createdAt: {
          gte: minCreatedAt,
          lte: maxCreatedAt,
        },
        updatedAt: {
          gte: minUpdatedAt,
          lte: maxUpdatedAt,
        },
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      },
      orderBy: { [sortedBy]: sortOrder },
      skip: (page - 1) * limit,
      take: limit,
    }),
  ]);

  return toCategoryPaginationOutput({
    resources: foundCategories,
    total,
    limit,
    page,
  });
};

const create = async ({ name, description, slug }: CategoryCreateInput) => {
  const foundCategory =
    (await prisma.category.findUnique({
      where: { name },
    })) !== null;

  if (foundCategory) {
    throw new ConflictError([
      { field: 'name', message: 'Category name is already registered.' },
    ]);
  }

  const createdCategory = await prisma.category.create({
    data: { name, description, slug },
  });

  return toCategoryOutput(createdCategory);
};

const update = async ({
  id,
  name,
  description,
  slug,
  includeInactive,
}: CategoryUpdateInput) => {
  await findById({ id, includeInactive });

  const foundCategory = await prisma.category.findUnique({
    where: { name },
  });

  if (foundCategory && foundCategory.id !== id) {
    throw new ConflictError([
      { field: 'name', message: 'Category name is already registered.' },
    ]);
  }

  const updatedCategory = await prisma.category.update({
    data: { name, description, slug },
    where: { id },
  });

  return toCategoryOutput(updatedCategory);
};

const updateIsActive = async ({
  id,
  includeInactive,
  isActive,
}: CategoryUpdateIsActiveInput) => {
  await findById({ id, includeInactive });

  const updatedCategory = await prisma.category.update({
    data: { isActive },
    where: { id },
  });

  console.log(`updated Category`, updatedCategory);

  return toCategoryOutput(updatedCategory);
};

const remove = async ({ id, includeInactive }: CategoryRemoveInput) => {
  await findById({ id, includeInactive });

  await prisma.category.delete({ where: { id } });
};

export const categoryService = {
  findMany,
  find,
  create,
  update,
  updateIsActive,
  remove,
};
