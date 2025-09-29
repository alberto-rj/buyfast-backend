import { prisma } from '../../../src/config';
import { toSlug } from '../../../src/utils';

import categoryEntries from '../data/categories.json';

export type CategoryEntries = {
  name: string;
  description: string;
};

export const categories = categoryEntries as CategoryEntries[];

export const createCategory = async ({
  name,
  description,
}: CategoryEntries) => {
  const slug = toSlug(name);

  const createdCategory = await prisma.category.create({
    data: { name, slug, description },
  });

  return createdCategory;
};

export const deleteAllCategories = async () => {
  await prisma.category.deleteMany();
};

export const createCategories = async () => {
  deleteAllCategories();

  for (const { name, description } of categories) {
    await createCategory({ name, description });
  }
};

export const getRandomCategoryEntries = () => {
  const index = Math.floor(Math.random() * categories.length);
  const category = categories[index];
  return category;
};
