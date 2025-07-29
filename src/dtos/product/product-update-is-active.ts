import { z } from 'zod';

import {
  id,
  includeCategory,
  includeInactive,
  includeInactiveCategory,
  isActive,
} from './';
import { validate } from '../../utils';

export const productUpdateIsActive = z.object({
  params: z.object({
    id,
  }),
  query: z.object({
    includeInactive,
    includeCategory,
  }),
  body: z.object({
    isActive,
  }),
});

export type ProductUpdateIsActive = z.infer<typeof productUpdateIsActive>;

export type ProductUpdateIsActiveInput = ProductUpdateIsActive['params'] &
  ProductUpdateIsActive['query'] &
  ProductUpdateIsActive['body'];

export const toProductUpdateIsActive = (input: unknown) => {
  return validate<ProductUpdateIsActive>(productUpdateIsActive, input);
};
