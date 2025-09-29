import { z } from 'zod';

import { id, includeInactive } from '../product';
import { validate } from '../../utils';

export const productRemoveImages = z.object({
  params: z.object({
    id,
  }),
  query: z.object({
    includeInactive,
  }),
});

export type ProductRemoveImages = z.infer<typeof productRemoveImages>;

export type ProductRemoveImagesInput = ProductRemoveImages['params'] &
  ProductRemoveImages['query'];

export const toProductRemoveImages = (input: unknown) => {
  return validate<ProductRemoveImages>(productRemoveImages, input);
};
