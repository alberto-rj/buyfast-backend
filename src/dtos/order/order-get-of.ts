import { z } from 'zod';

import { id } from '.';
import { validate } from '../../utils';

export const orderGetOf = z.object({
  params: z.object({
    id,
  }),
});

export type OrderGetOf = z.infer<typeof orderGetOf>;

export type OrderGetOfInput = OrderGetOf['params'] & { userId: string };

export const toOrderGetOf = (input: unknown): OrderGetOf => {
  return validate<OrderGetOf>(orderGetOf, input);
};
