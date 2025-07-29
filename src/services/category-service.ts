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

import {
  canIncludeInactive,
  ConflictError,
  getCategoryFindManyArgs,
  NotFoundError,
} from '../utils';

const ensureCanFind = async ({ id, includeInactive }: CategoryFindInput) => {
  const foundCategory = await prisma.category.findUnique({
    where: {
      id,
      isActive: canIncludeInactive(includeInactive),
    },
    select: { isActive: true },
  });

  if (!foundCategory) {
    throw new NotFoundError('Category not found.');
  }
};

const ensureCanUpdateName = async ({
  id,
  name,
}: {
  id: string;
  name: string;
}) => {
  const foundCategory = await prisma.category.findUnique({
    where: { name },
    select: { id: true },
  });

  if (foundCategory && foundCategory.id !== id) {
    throw new ConflictError([
      { field: 'name', message: 'Category name is already registered.' },
    ]);
  }
};

const ensureCanInsertName = async ({ name }: { name: string }) => {
  const foundCategory = await prisma.category.findUnique({
    where: { name },
    select: { isActive: true },
  });

  if (foundCategory) {
    throw new ConflictError([
      { field: 'name', message: 'Category name is already registered.' },
    ]);
  }
};

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
  limit,
  page,
  ...props
}: CategoryFindManyInput) => {
  const [total, foundCategories] = await Promise.all([
    prisma.category.count({
      where: { isActive: canIncludeInactive(includeInactive) },
    }),
    prisma.category.findMany(
      getCategoryFindManyArgs({
        page,
        limit,
        includeInactive,
        ...props,
      }) as { [x: string]: never },
    ),
  ]);

  return toCategoryPaginationOutput({
    resources: foundCategories,
    total,
    limit,
    page,
  });
};

const create = async ({ name, description, slug }: CategoryCreateInput) => {
  await ensureCanInsertName({ name });

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
  await Promise.all([
    ensureCanFind({ id, includeInactive }),
    ensureCanUpdateName({ id, name }),
  ]);

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
  await ensureCanFind({ id, includeInactive });

  const updatedCategory = await prisma.category.update({
    data: { isActive },
    where: { id },
  });

  return toCategoryOutput(updatedCategory);
};

const remove = async ({ id, includeInactive }: CategoryRemoveInput) => {
  await ensureCanFind({ id, includeInactive });

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
