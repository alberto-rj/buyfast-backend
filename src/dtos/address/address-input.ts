import { z } from 'zod';

import {
  street,
  complement,
  country,
  neighborhood,
  state,
  zipCode,
  city,
} from '.';
import { validate } from '../../utils';

export const addressCreateInput = z.object({
  street,
  complement: complement.optional(),
  neighborhood,
  city,
  state,
  zipCode,
  country,
});

export type AddressCreateInput = z.infer<typeof addressCreateInput>;

export const toAddressCreateInput = (data: unknown): AddressCreateInput => {
  return validate(addressCreateInput, data);
};
