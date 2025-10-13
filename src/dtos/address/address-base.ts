import validator from 'validator';
import { z } from 'zod';

import { setDefaultFalse, setUUID } from '../../dtos';

export const street = z
  .string({ error: 'street must be a string' })
  .min(5, { error: 'street must have at least 5 characters.' });

export const complement = z.string({ error: 'complement must be a string.' });

export const neighborhood = z
  .string({
    error: 'neighborhood must be a string.',
  })
  .min(2, { error: 'neighborhood must have at least 2 characters.' });

export const city = z
  .string({ error: 'city must be a string.' })
  .min(2, { error: 'city must have at least 2 characters.' });

export const state = z
  .string({ error: 'state must be a string.' })
  .min(2, { error: 'state must be at least 2 characters.' });

export const zipCode = z
  .string({ error: 'zipCode must be a string.' })
  .refine((input) => validator.isPostalCode(input, 'US'), {
    error: 'zipCode is invalid.',
  });

export const country = z.string({ error: 'country must be a string.' });

export const billingAddressId = setUUID('billingAddressId');

export const shippingAddressId = setUUID('shippingAddressId');

export const useSameForBilling = setDefaultFalse({
  fieldName: 'useSameForBilling',
});
