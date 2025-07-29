import { prisma } from '../../src/config';
import { toSlug } from '../../src/utils';

import categoryEntries from './data/categories.json';

const categories = categoryEntries as { name: string; description?: string }[];

const createCategory = async ({
  name,
  description,
}: {
  name: string;
  description?: string;
}) => {
  const slug = toSlug(name);

  await prisma.category.create({ data: { name, slug, description } });
};

const deleteAllCategories = async () => {
  await prisma.category.deleteMany();
};

export const createCategories = async () => {
  deleteAllCategories();
  for (const { name, description } of categories) {
    await createCategory({ name, description });
  }
};
