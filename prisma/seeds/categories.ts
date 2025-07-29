import { prisma } from '../../src/config';
import { toSlug } from '../../src/utils';

import categoriesData from './categories.json';

const categories = categoriesData as { name: string; description?: string }[];

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

export const createCategories = () => {
  categories.forEach(createCategory);
};
