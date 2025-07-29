import { CartItem as SimpleCartItem, Product } from '@prisma/client';

export type CartItem = SimpleCartItem & {
  product?: Product;
};
