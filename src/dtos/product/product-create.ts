import { z } from 'zod';

import {
  categoryId,
  description,
  includeCategory,
  includeInactiveCategory,
  name,
  price,
  quantity,
  sku,
} from './';
import { validate } from '../../utils';

export const productCreate = z.object({
  query: z.object({
    includeCategory,
    includeInactiveCategory,
  }),
  body: z.object({
    name,
    description: description.optional(),
    price,
    quantity,
    sku,
    categoryId,
  }),
});

export type ProductCreate = z.infer<typeof productCreate>;

export type ProductCreateInput = ProductCreate['query'] & ProductCreate['body'];

export const toProductCreate = (input: unknown) => {
  return validate<ProductCreate>(productCreate, input);
};
