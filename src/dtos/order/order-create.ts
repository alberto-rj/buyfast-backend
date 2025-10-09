import { z } from 'zod';

import { address } from './';
import { validate } from '../../utils';

export const orderCreate = z.object({
  body: z.object({
    shippingAddress: address,
    billingAddress: address,
  }),
});

export type OrderCreate = z.infer<typeof orderCreate>;

export type OrderCreateInput = OrderCreate['body'] & { userId: string };

export const toOrderCreate = (input: unknown): OrderCreate => {
  return validate<OrderCreate>(orderCreate, input);
};
