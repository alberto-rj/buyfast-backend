import { z } from 'zod';

import { includeProduct, productId, quantity } from '.';
import { validate } from '../../utils';

const cartAdd = z.object({
  query: z.object({
    includeProduct,
  }),
  body: z.object({
    productId,
    quantity,
  }),
});

export type CartAdd = z.infer<typeof cartAdd>;

export type CartAddInput = CartAdd['query'] &
  CartAdd['body'] & { userId: string };

export const toCartAdd = (input: unknown) => {
  return validate<CartAdd>(cartAdd, input);
};
