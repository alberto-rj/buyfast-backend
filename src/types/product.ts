import { Category, Product as SimpleProduct } from '@prisma/client';

export type Product = SimpleProduct & {
  category?: Category;
};
