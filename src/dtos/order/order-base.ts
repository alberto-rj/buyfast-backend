import { z } from 'zod';

import {
  setDefaultFalse,
  setLimit,
  setMaxCreatedAt,
  setMaxUpdatedAt,
  setMinCreatedAt,
  setMinUpdatedAt,
  setOrder,
  setPage,
  setUUID,
} from '..';
import { OrderStatus } from '../../types';
import validator from 'validator';

export const phone = z
  .string({
    error: 'phone must be a string.',
  })
  .min(9, { error: 'phone must have at least 9 characters.' });

export const street = z
  .string({ error: 'street must be a string' })
  .min(5, { error: 'street must have at least 5 characters.' });

export const city = z
  .string({ error: 'city must be a string.' })
  .min(2, { error: 'city must have at least 2 characters.' });

export const zipCode = z
  .string({ error: 'zipCode must be a string.' })
  .refine((input) => validator.isPostalCode(input, 'US'), {
    error: 'zipCode is invalid.',
  });

export const id = setUUID();

export const userId = setUUID('userId');

export const status = z.enum(
  [
    OrderStatus.Pending,
    OrderStatus.Processing,
    OrderStatus.Shipped,
    OrderStatus.Delivered,
    OrderStatus.Cancelled,
  ],
  {
    error:
      'order must be only "Pending", "Processing", "Shipped", "Delivered" or "Canceled"',
  },
);

export const sortBy = z
  .enum(['createdAt', 'updatedAt', 'number'], {
    error: 'sortBy must be only "createdAt", "updated" or "number"',
  })
  .default('createdAt');

export const order = setOrder();

export const page = setPage();

export const limit = setLimit({ defaultValue: 10 });

export const includeUser = setDefaultFalse({ fieldName: 'includeUser' });

export const search = z.string({ error: 'search must be a string.' });

export const minUnitPrice = z.coerce.number();

export const maxUnitPrice = z.coerce.number();

export const minQuantity = z.coerce.number().int();

export const maxQuantity = z.coerce.number().int();

export const minCreatedAt = setMinCreatedAt();

export const maxCreatedAt = setMaxCreatedAt();

export const minUpdatedAt = setMinUpdatedAt();

export const maxUpdatedAt = setMaxUpdatedAt();
