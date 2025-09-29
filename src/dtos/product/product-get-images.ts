import { z } from 'zod';

import { id, includeInactive } from '.';
import { validate } from '../../utils';

export const productGetImages = z.object({
  params: z.object({
    id,
  }),
  query: z.object({
    includeInactive,
  }),
});

export type ProductGetImages = z.infer<typeof productGetImages>;

export type ProductGetImagesInput = ProductGetImages['params'] &
  ProductGetImages['query'];

export const toProductGetImages = (input: unknown) => {
  return validate<ProductGetImages>(productGetImages, input);
};
