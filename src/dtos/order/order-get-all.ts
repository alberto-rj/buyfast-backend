import { z } from 'zod';

import { limit, order, page, sortBy, status } from '.';
import { validate } from '../../utils';

export const orderGetAll = z.object({
  params: z.object({
    status: status.optional(),
    page,
    limit,
    sortBy,
    order,
  }),
});

export type OrderGetAll = z.infer<typeof orderGetAll>;

export type OrderGetAllInput = OrderGetAll['params'];

export const toOrderGetAll = (input: unknown): OrderGetAll => {
  return validate<OrderGetAll>(orderGetAll, input);
};
