import { z } from 'zod';

import {
  id,
  includeInactive,
  categoryId,
  description,
  name,
  price,
  quantity,
  sku,
  dimensions,
  weight,
  includeInactiveCategory,
  includeCategory,
} from '.';
import { validate } from '../../utils';

export const productUpdate = z.object({
  params: z.object({
    id,
  }),
  query: z.object({
    includeInactive,
    includeCategory,
    includeInactiveCategory,
  }),
  body: z.object({
    name,
    price,
    quantity,
    sku,
    categoryId,
    description: description.optional(),
    dimensions: dimensions.optional(),
    weight: weight.optional(),
  }),
});

export type ProductUpdate = z.infer<typeof productUpdate>;

export type ProductUpdateInput = ProductUpdate['params'] &
  ProductUpdate['query'] &
  ProductUpdate['body'];

export const toProductUpdate = (input: unknown) => {
  return validate<ProductUpdate>(productUpdate, input);
};
