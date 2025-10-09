import { z } from 'zod';

import { limit, order, page, sortBy, status, userId } from '.';
import { validate } from '../../utils';

export const orderGetAllOf = z.object({
  params: z.object({
    userId,
    status: status.optional(),
    page,
    limit,
    sortBy,
    order,
  }),
});

export type OrderGetAllOf = z.infer<typeof orderGetAllOf>;

export type OrderGetAllOfInput = OrderGetAllOf['params'];

export const toOrderGetAllOf = (input: unknown): OrderGetAllOf => {
  return validate<OrderGetAllOf>(orderGetAllOf, input);
};
