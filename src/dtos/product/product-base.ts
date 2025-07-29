import { z } from 'zod';

import {
  setCreatedAtMax,
  setCreatedAtMin,
  setDefaultFalse,
  setDefaultTrue,
  setLimit,
  setPage,
  setSearch,
  setOrder,
  setUpdatedAtMax,
  setUpdatedAtMin,
  setUUID,
} from '..';

export const id = setUUID();

export const name = z.coerce
  .string({
    invalid_type_error: 'name must be a string.',
    required_error: 'name must be provided.',
  })
  .min(4, { message: 'name must have at least 4 characters.' })
  .max(255, { message: 'name cannot exceed 255 characters.' });

export const description = z.coerce
  .string({
    required_error: 'description must be provided.',
    invalid_type_error: 'description must be a string.',
  })
  .max(600, { message: 'description cannot exceed 600 characters.' });

export const price = z.coerce
  .number({
    required_error: 'price must be provided.',
    invalid_type_error: 'price must be a number.',
  })
  .min(0, { message: 'price must be at least 0.' })
  .default(0);

export const quantity = z.coerce
  .number({
    required_error: 'quantity must be provided.',
    invalid_type_error: 'quantity must be a number.',
  })
  .int({ message: 'quantity must be an integer.' })
  .min(0, { message: 'quantity must be at least 0.' })
  .default(0);

export const sku = z.coerce
  .string({
    required_error: 'sku must be provided.',
    invalid_type_error: 'sku must be a string.',
  })
  .min(1, { message: 'sku must have at least 1 character.' });

export const categoryId = setUUID('categoryId');

export const isActive = setDefaultTrue({ fieldName: 'isActive' });

export const includeInactive = setDefaultFalse({
  fieldName: 'includeInactive',
});

export const includeInactiveCategory = setDefaultFalse({
  fieldName: 'includeInactiveCategory',
});

export const includeCategory = setDefaultFalse({
  fieldName: 'includeCategory',
});

export const weight = z.coerce
  .number({
    required_error: 'weight must be provided.',
    invalid_type_error: 'weight must be a number.',
  })
  .min(0, { message: 'weight must be at least 0.' });

export const dimensions = z.coerce
  .string({
    required_error: 'dimensions must be provided.',
    invalid_type_error: 'dimensions must be a string.',
  })
  .max(100, { message: 'dimensions can not exceed 100 characters.' });

export const priceMin = z.coerce
  .number({
    required_error: 'priceMin must be provided.',
    invalid_type_error: 'priceMin must be a number.',
  })
  .min(0, { message: 'priceMin must be at least 0.' });

export const priceMax = z.coerce
  .number({
    required_error: 'priceMax must be provided.',
    invalid_type_error: 'priceMax must be a number.',
  })
  .min(0, { message: 'priceMax must be at least 0.' });

export const quantityMin = z.coerce
  .number({
    required_error: 'quantityMin must be provided.',
    invalid_type_error: 'quantityMin must be a number.',
  })
  .int({ message: 'quantityMin must be an integer.' })
  .min(0, { message: 'quantityMin must be at least 0.' });

export const quantityMax = z.coerce
  .number({
    required_error: 'quantityMax must be provided.',
    invalid_type_error: 'quantityMax must be a number.',
  })
  .int({ message: 'quantityMax must be an integer number.' })
  .min(0, { message: 'quantityMax must be at least 0.' });

export const weightMin = z.coerce
  .number({
    required_error: 'weightMin must be provided.',
    invalid_type_error: 'weightMin must be a number.',
  })
  .min(0, { message: 'weightMin must be at least 0.' });

export const weightMax = z.coerce
  .number({
    required_error: 'weightMax must be provided.',
    invalid_type_error: 'weightMax must be a number.',
  })
  .min(0, { message: 'weightMax must be at least 0.' });

export const createdAtMin = setCreatedAtMin();

export const createdAtMax = setCreatedAtMax();

export const updatedAtMin = setUpdatedAtMin();

export const updatedAtMax = setUpdatedAtMax();

export const sortBy = z
  .enum(
    ['name', 'price', 'quantity', 'weight', 'sku', 'createdAt', 'updatedAt'],
    {
      required_error: 'sortBy must be provided.',
      invalid_type_error: 'sortBy only must be an enum.',
      message:
        'sortBy only must be name "name", "price", "quantity", "weight", "sku", "createdAt" or "updatedAt".',
    },
  )
  .default('updatedAt');

export const order = setOrder({ fieldName: 'order' });

export const page = setPage();

export const limit = setLimit({ defaultValue: 10, maxValue: 40 });

export const search = setSearch({ defaultValue: '' });

export const category = setSearch({ defaultValue: '' });
