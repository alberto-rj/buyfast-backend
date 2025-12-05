import { z } from 'zod';

import { id } from '.';
import { validate } from '../../utils';

export const orderCancel = z.object({
  params: z.object({
    id,
  }),
});

export type OrderCancel = z.infer<typeof orderCancel>;

export type OrderCancelInput = OrderCancel['params'] & { userId: string };

export const toOrderCancel = (input: unknown): OrderCancel => {
  return validate<OrderCancel>(orderCancel, input);
};
