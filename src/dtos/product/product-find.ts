import { z } from 'zod';

import {
  id,
  includeCategory,
  includeImages,
  includeInactive,
  includeInactiveCategory,
} from '.';
import { validate } from '../../utils';

export const productFind = z.object({
  params: z.object({
    id,
  }),
  query: z.object({
    includeInactive,
    includeImages,
    includeInactiveCategory,
    includeCategory,
  }),
});

export type ProductFind = z.infer<typeof productFind>;

export type ProductFindInput = ProductFind['params'] & ProductFind['query'];

export const toProductFind = (input: unknown) => {
  return validate<ProductFind>(productFind, input);
};
