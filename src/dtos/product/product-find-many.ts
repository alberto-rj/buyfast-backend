import { z } from 'zod';

import {
  includeCategory,
  includeInactive,
  includeInactiveCategory,
  search,
  limit,
  page,
  minPrice,
  maxPrice,
  minQuantity,
  maxQuantity,
  minWeight,
  maxWeight,
  sortBy,
  order,
  minCreatedAt,
  maxCreatedAt,
  minUpdatedAt,
  maxUpdatedAt,
  category,
} from '.';
import { validate } from '../../utils';

export const productFindMany = z.object({
  query: z.object({
    minPrice: minPrice.optional(),
    maxPrice: maxPrice.optional(),
    minQuantity: minQuantity.optional(),
    maxQuantity: maxQuantity.optional(),
    minWeight: minWeight.optional(),
    maxWeight: maxWeight.optional(),
    minCreatedAt: minCreatedAt.optional(),
    maxCreatedAt: maxCreatedAt.optional(),
    minUpdatedAt: minUpdatedAt.optional(),
    maxUpdatedAt: maxUpdatedAt.optional(),
    category,
    search,
    includeInactive,
    includeCategory,
    includeInactiveCategory,
    page,
    limit,
    sortBy,
    order,
  }),
});

export type ProductFindMany = z.infer<typeof productFindMany>;

export type ProductFindManyInput = ProductFindMany['query'];

export const toProductFindMany = (input: unknown) => {
  return validate<ProductFindMany>(productFindMany, input);
};
