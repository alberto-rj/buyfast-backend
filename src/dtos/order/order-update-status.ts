import { z } from 'zod';

import { id, status } from '.';
import { validate } from '../../utils';

export const orderUpdateStatus = z.object({
  params: z.object({
    id,
  }),
  body: z.object({
    status,
  }),
});

export type OrderUpdateStatus = z.infer<typeof orderUpdateStatus>;

export type OrderUpdateStatusInput = OrderUpdateStatus['params'] &
  OrderUpdateStatus['body'] & { userId: string };

export const toOrderUpdateStatus = (input: unknown): OrderUpdateStatus => {
  return validate<OrderUpdateStatus>(orderUpdateStatus, input);
};
