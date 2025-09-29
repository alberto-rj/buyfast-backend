import { z } from 'zod';

import { id, includeInactive } from '.';
import { validate } from '../../utils';

export const productUploadImages = z.object({
  params: z.object({
    id,
  }),
  query: z.object({
    includeInactive,
  }),
});

export type ProductUploadImages = z.infer<typeof productUploadImages>;

export type ProductUploadImagesInput = ProductUploadImages['params'] &
  ProductUploadImages['query'] & { files: Express.Multer.File[] };

export const toProductUploadImages = (input: unknown) => {
  return validate<ProductUploadImages>(productUploadImages, input);
};
