import { z } from 'zod';

import { phone, street, city, zipCode } from '.';
import { validate } from '../../utils';

export const orderCreate = z.object({
  body: z.object({
    deliveryAddress: z.object({
      phone,
      street,
      city,
      zipCode,
    }),
  }),
});

export type OrderCreate = z.infer<typeof orderCreate>;

export type OrderCreateInput = OrderCreate['body'] & { userId: string };

export const toOrderCreate = (input: unknown): OrderCreate => {
  return validate<OrderCreate>(orderCreate, input);
};
