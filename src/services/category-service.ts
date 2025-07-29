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

import { ConflictError, NotFoundError } from '../utils';

const getIsActive = (includeInactive: boolean) => {
  if (includeInactive) {
    return undefined;
  }
  return true;
};

const findById = async ({ id, includeInactive }: CategoryFindInput) => {
  const filteredCategory = await prisma.category.findUnique({
    where: { id, isActive: getIsActive(includeInactive) },
  });

  if (!filteredCategory) {
    throw new NotFoundError('Category not found.');
  }

  return toCategoryOutput(filteredCategory);
};

const find = async ({ id, includeInactive }: CategoryFindInput) => {
  return await findById({ id, includeInactive });
};

const findMany = async ({
  includeInactive,
  createdAtMin,
  createdAtMax,
  updatedAtMin,
  updatedAtMax,
  search,
  sortedBy,
  sortOrder,
  limit,
  page,
}: CategoryFindManyInput) => {
  const [total, filteredCategories] = await Promise.all([
    prisma.category.count({
      where: { isActive: getIsActive(includeInactive) },
    }),
    prisma.category.findMany({
      where: {
        isActive: getIsActive(includeInactive),
        createdAt: {
          gte: createdAtMin,
          lte: createdAtMax,
        },
        updatedAt: {
          gte: updatedAtMin,
          lte: updatedAtMax,
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
    resources: filteredCategories,
    total,
    limit,
    page,
  });
};

const create = async ({ name, description, slug }: CategoryCreateInput) => {
  const filteredCategory =
    (await prisma.category.findUnique({
      where: { name },
    })) !== null;

  if (filteredCategory) {
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

  const filteredCategory = await prisma.category.findUnique({
    where: { name },
  });

  if (filteredCategory && filteredCategory.id !== id) {
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
