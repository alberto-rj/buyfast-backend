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
  setUUID,
} from '..';

export const id = setUUID();

export const name = z
  .string({
    error: 'name must be string.',
  })
  .min(1, { error: 'name must have at least 1 character.' })
  .max(100, { error: 'name cannot exceed 100 characters.' });

export const description = z
  .string({
    error: 'description must be string.',
  })
  .max(500, { error: 'description cannot exceed 500 characters.' });

export const slug = z
  .string({
    error: 'slug must be string.',
  })
  .max(100, { error: 'slug cannot exceed 100 characters.' });

export const includeInactive = setDefaultFalse({
  fieldName: 'includeInactive',
});

export const isActive = setDefaultTrue({ fieldName: 'isActive' });

export const limit = setLimit();

export const page = setPage();

export const sortBy = z
  .enum(['name', 'createdAt', 'updatedAt'], {
    error: 'sortBy must be "name", "createdAt" or "updatedAt".',
  })
  .default('createdAt');

export const order = setOrder({ defaultValue: 'desc' });

export const search = z.string({ error: 'search must be a string.' });

export const minCreatedAt = setMinCreatedAt();

export const maxCreatedAt = setMaxCreatedAt();

export const minUpdatedAt = setMinUpdatedAt();

export const maxUpdatedAt = setMaxUpdatedAt();
