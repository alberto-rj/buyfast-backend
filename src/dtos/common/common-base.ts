import validator from 'validator';
import * as z from 'zod';

export const setSearch = (
  options: Partial<{
    fieldName: string;
    defaultValue: string;
  }> = {},
) => {
  const { fieldName = 'search', defaultValue = '' } = options;
  return z
    .string({ error: `${fieldName} must be a string.` })
    .default(defaultValue);
};

export const setOrder = (
  options: Partial<{
    fieldName: string;
    defaultValue: 'asc' | 'desc';
  }> = {},
) => {
  const { fieldName = 'order', defaultValue = 'desc' } = options;
  return z
    .enum(['asc', 'desc'], {
      error: `${fieldName} must be "asc" or "desc".`,
    })
    .default(defaultValue);
};

export const setLimit = (
  options: Partial<{
    fieldName: string;
    minValue: number;
    maxValue: number;
    defaultValue: number;
  }> = {},
) => {
  const {
    fieldName = 'limit',
    minValue = 0,
    maxValue = 40,
    defaultValue = 10,
  } = options;
  return z
    .number({
      error: `${fieldName} must be a number.`,
    })
    .int({ error: `${fieldName} must be an integer.` })
    .min(minValue, { error: `${fieldName} must at least ${minValue}.` })
    .max(maxValue, { error: `${fieldName} cannot exceed ${maxValue}.` })
    .default(defaultValue);
};

export const setPage = (
  options: Partial<{
    fieldName: string;
    minValue: number;
    defaultValue: number;
  }> = {},
) => {
  const { fieldName = 'page', minValue = 1, defaultValue = 1 } = options;
  return z
    .number({
      error: `${fieldName} must be a number.`,
    })
    .int({ error: `${fieldName} must be an integer.` })
    .min(minValue, { error: `${fieldName} must be at least ${minValue}.` })
    .default(defaultValue);
};

export const setUUID = (fieldName: string = 'id') =>
  z.uuid({
    error: `${fieldName} must be a valid UUID v4 (e.g., "123e4567-e89b-12d3-a456-426614174000").`,
  });

export const setImageURL = ({
  fieldName = 'image',
  fileName = 'image',
}: {
  fieldName: string;
  fileName: string;
}) =>
  z
    .string({ error: 'coverImage is required.' })
    .refine(input => validator.isURL(input), {
      error: `${fieldName} must be a valid URL (e.g., "https://example.com/${fileName}.png").`,
    });

export const setISODate = ({ fieldName }: { fieldName: string }) =>
  z
    .string({
      error: `${fieldName} must be string`,
    })
    .refine(input => validator.isISO8601(input, { strict: true }), {
      error: `${fieldName} must be only in ISO 8601 (e.g., "2025-05-25T00:00:00Z").`,
    })
    .transform(input => new Date(input));

export const setISOFutureDate = ({ fieldName }: { fieldName: string }) =>
  z
    .string({
      error: `${fieldName} must be string`,
    })
    .refine(input => validator.isISO8601(input, { strict: true }), {
      error: `${fieldName} must be only in ISO 8601 (e.g., "2025-05-25T00:00:00Z").`,
    })
    .refine(input => validator.isBefore(input), {
      error: `${fieldName} must be only in the future.`,
    })
    .transform(input => new Date(input));

export const setISOPastDate = ({ fieldName }: { fieldName: string }) =>
  z
    .string({
      error: `${fieldName} must be string`,
    })
    .refine(input => validator.isISO8601(input, { strict: true }), {
      error: `${fieldName} must be only in ISO 8601 (e.g., "2025-05-25T00:00:00Z").`,
    })
    .refine(input => validator.isAfter(input), {
      error: `${fieldName} must be only in the past.`,
    })
    .transform(input => new Date(input));

export const setDefaultFalse = ({ fieldName }: { fieldName: string }) =>
  z
    .string()
    .default('false')
    .refine(arg => arg === 'true' || arg === 'false', {
      error: `${fieldName} must be only "true" or "false".`,
    })
    .transform(arg => arg === 'true');

export const setDefaultTrue = ({ fieldName }: { fieldName: string }) =>
  z
    .string()
    .default('true')
    .refine(arg => arg === 'true' || arg === 'false', {
      error: `${fieldName} must be only "true" or "false".`,
    })
    .transform(arg => arg === 'true');

export const setMinCreatedAt = (fieldName: string = 'minCreatedAt') =>
  setISOPastDate({ fieldName });
export const setMaxCreatedAt = (fieldName: string = 'maxCreatedAt') =>
  setISOFutureDate({ fieldName });

export const setMinUpdatedAt = (fieldName: string = 'minUpdatedAt') =>
  setISOPastDate({ fieldName });
export const setMaxUpdatedAt = (fieldName: string = 'maxUpdatedAt') =>
  setISOFutureDate({ fieldName });
