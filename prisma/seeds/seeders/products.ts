import { prisma } from '../../../src/config';

import productEntries from '../data/products.json';

import { createCategory, getRandomCategoryEntries } from './categories';

export type ProductEntries = {
  name: string;
  description: string;
  sku: string;
  price: number;
  quantity: number;
};

export const products = productEntries as ProductEntries[];

export const createProduct = async ({
  name,
  description,
  sku,
  price,
  quantity,
}: ProductEntries) => {
  const categoryEntries = getRandomCategoryEntries();

  let category = await prisma.category.findUnique({
    where: {
      name: categoryEntries.name,
    },
  });

  if (!category) {
    category = await createCategory(categoryEntries);
  }

  const createdProduct = await prisma.product.create({
    data: {
      name,
      description,
      sku,
      price,
      quantity,
      categoryId: category.id,
    },
  });

  return createdProduct;
};

export const deleteAllProducts = async () => {
  await prisma.product.deleteMany();
};

export const createProducts = async () => {
  await deleteAllProducts();

  for (const product of products) {
    await createProduct(product);
  }
};

export const getRandomProductEntries = () => {
  const index = Math.floor(Math.random() * products.length);
  return products[index];
};
