import {
  Category,
  ProductImage,
  Product as SimpleProduct,
} from '@prisma/client';

type Product = SimpleProduct & {
  category?: Category;
  images?: ProductImage[];
};

export { Product, ProductImage };
