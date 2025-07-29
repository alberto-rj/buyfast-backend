import { z } from 'zod';

import { setDefaultFalse, setLimit, setPage, setUUID } from '..';

export const id = setUUID();

export const userId = setUUID('userId');

export const productId = setUUID('productId');

export const quantity = z.coerce
  .number({
    required_error: 'quantity must be provided',
    invalid_type_error: 'quantity must be a number.',
  })
  .int({ message: 'quantity must be an integer.' })
  .min(0, { message: 'quantity must be at least 0.' })
  .max(1000000, { message: 'quantity cannot exceed 1000000.' });

export const includeProduct = setDefaultFalse({ fieldName: 'includeProduct' });

export const limit = setLimit({ defaultValue: 10, maxValue: 40 });

export const page = setPage();
