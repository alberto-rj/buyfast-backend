import { z } from 'zod';

import { id, includeProduct, quantity } from '.';
import { validate } from '../../utils';

const cartUpdate = z.object({
  params: z.object({
    id,
  }),
  query: z.object({
    includeProduct,
  }),
  body: z.object({
    quantity,
  }),
});

export type CartUpdate = z.infer<typeof cartUpdate>;

export type CartUpdateInput = CartUpdate['params'] &
  CartUpdate['query'] &
  CartUpdate['body'] & { userId: string };

export const toCartUpdate = (input: unknown) => {
  return validate<CartUpdate>(cartUpdate, input);
};
