import { z } from 'zod';

import {
  setCreatedAtMax,
  setCreatedAtMin,
  setDefaultFalse,
  setDefaultTrue,
  setLimit,
  setPage,
  setSearch,
  setSortOrder,
  setUpdatedAtMax,
  setUpdatedAtMin,
  setUUID,
} from '../common/common-base';

export const id = setUUID();

export const name = z.coerce
  .string({
    invalid_type_error: 'name must be string.',
    required_error: 'name must be provided.',
  })
  .min(1, { message: 'name must have at least 1 character.' })
  .max(100, { message: 'name cannot exceed 100 characters.' });

export const description = z.coerce
  .string({
    invalid_type_error: 'description must be string.',
    required_error: 'description must be provided.',
  })
  .max(500, { message: 'description cannot exceed 500 characters.' });

export const slug = z.coerce
  .string({
    required_error: 'slug must be provided.',
    invalid_type_error: 'slug must be string.',
  })
  .max(100, { message: 'slug cannot exceed 100 characters.' });

export const includeInactive = setDefaultFalse({
  fieldName: 'includeInactive',
});

export const isActive = setDefaultTrue({ fieldName: 'isActive' });

export const limit = setLimit();

export const page = setPage();

export const sortedBy = z
  .enum(['name', 'createdAt', 'updatedAt'], {
    invalid_type_error: 'sortedBy must be string.',
    message: 'sortedBy must be "name", "createdAt" or "updatedAt".',
  })
  .default('createdAt');
export const sortOrder = setSortOrder({ defaultValue: 'desc' });

export const search = setSearch({ defaultValue: '' });

export const createdAtMin = setCreatedAtMin();
export const createdAtMax = setCreatedAtMax();

export const updatedAtMin = setUpdatedAtMin();
export const updatedAtMax = setUpdatedAtMax();
