import { Product, ProductImage } from '../../types';
import {
  CategoryOutput,
  toCategoryOutput,
  PaginationOutput,
  toPaginationOutput,
} from '../../dtos';

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
  images?: ProductImageOutput[];
};

export type ProductImageOutput = {
  id: string;
  url: string;
  publicId: string;
  isPrimary: boolean;
  createdAt: string;
  updatedAt: string;
  altText?: String;
  order?: number;
};

export const toProductImageOutput = ({
  id,
  url,
  isPrimary,
  createdAt,
  updatedAt,
  altText,
  publicId,
  order,
}: ProductImage): ProductImageOutput => {
  return {
    id,
    url,
    publicId,
    isPrimary,
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
    altText: altText === null ? undefined : altText,
    order: order === null ? undefined : order,
  };
};

export const toProductOutput = ({
  createdAt,
  updatedAt,
  price,
  weight,
  dimensions,
  description,
  category,
  images,
  ...props
}: Product): ProductOutput => {
  return {
    ...props,
    price: price.toNumber(),
    weight: weight === null ? undefined : weight.toNumber(),
    dimensions: dimensions === null ? undefined : dimensions,
    description: description === null ? undefined : description,
    category: category ? toCategoryOutput(category) : undefined,
    images: images ? images.map(toProductImageOutput) : undefined,
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
    resources: resources.map(resource => toProductOutput(resource)),
  });
