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

export const toCartItemPaginationOutput = ({
  resources,
  total,
  limit,
  page,
}: {
  total: number;
  limit: number;
  page: number;
  resources: CartItem[];
}): PaginationOutput<CartItemOutput[]> =>
  toPaginationOutput({
    total,
    limit,
    page,
    resources: resources.map((resource) => toCartItemOutput(resource)),
  });
