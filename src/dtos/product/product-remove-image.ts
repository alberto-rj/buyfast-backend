import { z } from 'zod';

import { id, includeInactive } from '.';
import { id as imageId } from './product-base';
import { validate } from '../../utils';

export const productRemoveImage = z.object({
  params: z.object({
    id,
    imageId,
  }),
  query: z.object({
    includeInactive,
  }),
});

export type ProductRemoveImage = z.infer<typeof productRemoveImage>;

export type ProductRemoveImageInput = ProductRemoveImage['params'] &
  ProductRemoveImage['query'];

export const toProductRemoveImage = (input: unknown) => {
  return validate<ProductRemoveImage>(productRemoveImage, input);
};
