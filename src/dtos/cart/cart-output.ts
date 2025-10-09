import { CartItem } from '../../types';
import {
  PaginationOutput,
  ProductOutput,
  toPaginationOutput,
  toProductOutput,
} from '../../dtos';

export type CartItemOutput = {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product?: ProductOutput;
};

export type CartOutput = {
  items: PaginationOutput<CartItemOutput[]>;
  subtotal: number;
};

export const toCartItemOutput = ({
  createdAt,
  updatedAt,
  product,
  ...props
}: CartItem): CartItemOutput => {
  return {
    product: product ? toProductOutput(product) : undefined,
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
    ...props,
  };
};

export const toCartOutput = ({
  resources,
  subtotal,
  total,
  limit,
  page,
}: {
  total: number;
  limit: number;
  page: number;
  subtotal: number;
  resources: CartItem[];
}): CartOutput => {
  const items = toPaginationOutput({
    total,
    limit,
    page,
    resources: resources.map((resource) => toCartItemOutput(resource)),
  });

  return {
    items,
    subtotal,
  };
};
