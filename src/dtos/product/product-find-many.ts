import { z } from 'zod';

import {
  includeCategory,
  includeInactive,
  includeInactiveCategory,
  search,
  limit,
  page,
  priceMin,
  priceMax,
  quantityMin,
  quantityMax,
  weightMin,
  weightMax,
  sortBy,
  order,
  createdAtMin,
  createdAtMax,
  updatedAtMin,
  updatedAtMax,
  category,
} from '.';
import { validate } from '../../utils';

export const productFindMany = z.object({
  query: z.object({
    priceMin: priceMin.optional(),
    priceMax: priceMax.optional(),
    quantityMin: quantityMin.optional(),
    quantityMax: quantityMax.optional(),
    weightMin: weightMin.optional(),
    weightMax: weightMax.optional(),
    createdAtMin: createdAtMin.optional(),
    createdAtMax: createdAtMax.optional(),
    updatedAtMin: updatedAtMin.optional(),
    updatedAtMax: updatedAtMax.optional(),
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
