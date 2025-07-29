import { z } from 'zod';

import { id } from '.';
import { validate } from '../../utils';

const cartRemove = z.object({
  params: z.object({
    id,
  }),
});

export type CartRemove = z.infer<typeof cartRemove>;

export type CartRemoveInput = CartRemove['params'] & { userId: string };

export const toCartRemove = (input: unknown) => {
  return validate<CartRemove>(cartRemove, input);
};
