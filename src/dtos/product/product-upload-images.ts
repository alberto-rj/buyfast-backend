import { z } from 'zod';

import { id, includeInactive } from '.';
import { validate } from '../../utils';
import { altText, isPrimary, order } from './product-image-base';

export const productUploadImages = z.object({
  params: z.object({
    id,
  }),
  body: z.object({
    images: z.array(
      z.object({
        altText: altText.nullish(),
        order: order.nullish(),
        isPrimary,
      }),
    ),
  }),
  query: z.object({
    includeInactive,
  }),
});

export type ProductUploadImages = z.infer<typeof productUploadImages>;

export type ProductUploadImagesInput = ProductUploadImages['params'] &
  ProductUploadImages['query'] &
  ProductUploadImages['body'] & { files: Express.Multer.File[] };

export const toProductUploadImages = (input: unknown) => {
  return validate<ProductUploadImages>(productUploadImages, input);
};
