import * as z from 'zod';

import {
  setDefaultFalse,
  setDefaultTrue,
  setLimit,
  setMaxCreatedAt,
  setMaxUpdatedAt,
  setMinCreatedAt,
  setMinUpdatedAt,
  setOrder,
  setPage,
  setSearch,
  setUUID,
} from '..';

export const id = setUUID();

export const name = z
  .string({
    error: 'name must be a string.',
  })
  .min(4, { error: 'name must have at least 4 characters.' })
  .max(255, { error: 'name cannot exceed 255 characters.' });

export const description = z
  .string({
    error: 'description must be a string.',
  })
  .max(600, { error: 'description cannot exceed 600 characters.' });

export const price = z
  .number({
    error: 'price must be a number.',
  })
  .min(0, { error: 'price must be at least 0.' })
  .default(0);

export const quantity = z
  .int({ error: 'quantity must be an integer.' })
  .min(0, { error: 'quantity must be at least 0.' })
  .default(0);

export const sku = z
  .string({
    error: 'sku must be a string.',
  })
  .min(1, { error: 'sku must have at least 1 character.' });

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

export const weight = z
  .number({
    error: 'weight must be a number.',
  })
  .min(0, { error: 'weight must be at least 0.' });

export const dimensions = z
  .string({
    error: 'dimensions must be a string.',
  })
  .max(100, { error: 'dimensions can not exceed 100 characters.' });

export const minPrice = z
  .number({
    error: 'minPrice must be a number.',
  })
  .min(0, { error: 'minPrice must be at least 0.' });

export const maxPrice = z
  .number({
    error: 'maxPrice must be a number.',
  })
  .min(0, { error: 'maxPrice must be at least 0.' });

export const minQuantity = z
  .int({ error: 'minQuantity must be an integer.' })
  .min(0, { error: 'minQuantity must be at least 0.' });

export const maxQuantity = z
  .int({ error: 'maxQuantity must be an integer number.' })
  .min(0, { error: 'maxQuantity must be at least 0.' });

export const minWeight = z
  .number({
    error: 'minWeight must be a number.',
  })
  .min(0, { error: 'minWeight must be at least 0.' });

export const maxWeight = z
  .number({
    error: 'maxWeight must be a number.',
  })
  .min(0, { error: 'maxWeight must be at least 0.' });

export const minCreatedAt = setMinCreatedAt();

export const maxCreatedAt = setMaxCreatedAt();

export const minUpdatedAt = setMinUpdatedAt();

export const maxUpdatedAt = setMaxUpdatedAt();

export const sortBy = z
  .enum(
    ['name', 'price', 'quantity', 'weight', 'sku', 'createdAt', 'updatedAt'],
    {
      error:
        'sortBy only must be name "name", "price", "quantity", "weight", "sku", "createdAt" or "updatedAt".',
    },
  )
  .default('updatedAt');

export const order = setOrder({ fieldName: 'order' });

export const page = setPage();

export const limit = setLimit({ defaultValue: 10, maxValue: 40 });

export const search = setSearch({ defaultValue: '' });

export const category = setSearch({ defaultValue: '' });
