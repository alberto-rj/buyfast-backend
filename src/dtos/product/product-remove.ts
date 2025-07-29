import { z } from 'zod';

import { id, includeInactive } from '.';
import { validate } from '../../utils';

export const productRemove = z.object({
  params: z.object({
    id,
  }),
  query: z.object({
    includeInactive,
  }),
});

export type ProductRemove = z.infer<typeof productRemove>;

export type ProductRemoveInput = ProductRemove['params'] &
  ProductRemove['query'];

export const toProductRemove = (input: unknown) => {
  return validate<ProductRemove>(productRemove, input);
};
