import { z } from 'zod';

import {
  billingAddressId,
  shippingAddressId,
  useSameAddressForBilling,
} from '.';
import { addressCreateInput } from '../../dtos';
import { validate } from '../../utils';

export const orderCreate = z.object({
  body: z.object({
    shippingAddressId: shippingAddressId.optional(),
    billingAddressId: billingAddressId.optional(),
    newShippingAddress: addressCreateInput.optional(),
    newBillingAddress: addressCreateInput.optional(),
    useSameAddressForBilling,
  }),
});

export type OrderCreate = z.infer<typeof orderCreate>;

export type OrderCreateInput = OrderCreate['body'] & { userId: string };

export const toOrderCreate = (input: unknown): OrderCreate => {
  return validate<OrderCreate>(orderCreate, input);
};
