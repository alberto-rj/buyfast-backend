import { Product } from '../../types';
import { CategoryOutput, toCategoryOutput } from '../category-output';
import { PaginationOutput, toPaginationOutput } from '../common-output';

export type ProductOutput = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  sku: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  weight?: number;
  description?: string;
  dimensions?: string;
  category?: CategoryOutput;
};

export const toProductOutput = ({
  createdAt,
  updatedAt,
  price,
  weight,
  dimensions,
  description,
  category,
  ...props
}: Product): ProductOutput => {
  return {
    ...props,
    price: price.toNumber(),
    weight: weight === null ? undefined : weight.toNumber(),
    dimensions: dimensions === null ? undefined : dimensions,
    description: description === null ? undefined : description,
    category: category ? toCategoryOutput(category) : undefined,
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toDateString(),
  };
};

export const toProductPaginationOutput = ({
  resources,
  total,
  limit,
  page,
}: {
  total: number;
  limit: number;
  page: number;
  resources: Product[];
}): PaginationOutput<ProductOutput[]> =>
  toPaginationOutput({
    total,
    limit,
    page,
    resources: resources.map((resource) => toProductOutput(resource)),
  });
