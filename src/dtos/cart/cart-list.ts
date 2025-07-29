import { z } from 'zod';

import { includeProduct, limit, page } from '.';
import { validate } from '../../utils';

const cartList = z.object({
  query: z.object({
    includeProduct,
    limit,
    page,
  }),
});

export type CartList = z.infer<typeof cartList>;

export type CartListInput = CartList['query'] & { userId: string };

export const toCartList = (input: unknown) => {
  return validate<CartList>(cartList, input);
};
