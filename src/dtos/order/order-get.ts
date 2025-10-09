import { z } from 'zod';

import { id } from '.';
import { validate } from '../../utils';

export const orderGet = z.object({
  params: z.object({
    id,
  }),
});

export type OrderGet = z.infer<typeof orderGet>;

export type OrderGetInput = OrderGet['params'];

export const toOrderGet = (input: unknown): OrderGet => {
  return validate<OrderGet>(orderGet, input);
};
