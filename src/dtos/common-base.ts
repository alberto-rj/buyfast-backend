import validator from 'validator';
import { z } from 'zod';

export const setSearch = (
  options: Partial<{
    fieldName: string;
    defaultValue: string;
  }> = {},
) => {
  const { fieldName = 'search', defaultValue = '' } = options;
  return z
    .string({ invalid_type_error: `${fieldName} must be a string.` })
    .default(defaultValue);
};

export const setSortOrder = (
  options: Partial<{
    fieldName: string;
    defaultValue: 'asc' | 'desc';
  }> = {},
) => {
  const { fieldName = 'sortOrder', defaultValue = 'desc' } = options;
  return z
    .enum(['asc', 'desc'], {
      invalid_type_error: `${fieldName} must be a string.`,
      message: `${fieldName} must be "asc" or "desc".`,
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
  return z.coerce
    .number({
      invalid_type_error: `${fieldName} must be a number.`,
    })
    .int({ message: `${fieldName} must be an integer.` })
    .min(minValue, { message: `${fieldName} must at least ${minValue}.` })
    .max(maxValue, { message: `${fieldName} cannot exceed ${maxValue}.` })
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
  return z.coerce
    .number({
      invalid_type_error: `${fieldName} must be a number.`,
    })
    .int({ message: `${fieldName} must be an integer.` })
    .min(minValue, { message: `${fieldName} must be at least ${minValue}.` })
    .default(defaultValue);
};

export const setUUID = (fieldName: string = 'id') =>
  z.string({ required_error: `${fieldName} is required.` }).uuid({
    message: `${fieldName} must be a valid UUID v4 (e.g., "123e4567-e89b-12d3-a456-426614174000").`,
  });

export const setImageURL = ({
  fieldName = 'image',
  fileName = 'image',
}: {
  fieldName: string;
  fileName: string;
}) =>
  z
    .string({ required_error: 'coverImage is required.' })
    .refine((input) => validator.isURL(input), {
      message: `${fieldName} must be a valid URL (e.g., "https://example.com/${fileName}.png").`,
    });

export const setISODate = ({ fieldName }: { fieldName: string }) =>
  z
    .string({
      invalid_type_error: `${fieldName} must be string`,
      required_error: `${fieldName} is required.`,
    })
    .refine((input) => validator.isISO8601(input, { strict: true }), {
      message: `${fieldName} must be only in ISO 8601 (e.g., "2025-05-25T00:00:00Z").`,
    })
    .transform((input) => new Date(input));

export const setISOFutureDate = ({ fieldName }: { fieldName: string }) =>
  z
    .string({
      invalid_type_error: `${fieldName} must be string`,
      required_error: `${fieldName} is required.`,
    })
    .refine((input) => validator.isISO8601(input, { strict: true }), {
      message: `${fieldName} must be only in ISO 8601 (e.g., "2025-05-25T00:00:00Z").`,
    })
    .refine((input) => validator.isBefore(input), {
      message: `${fieldName} must be only in the future.`,
    })
    .transform((input) => new Date(input));

export const setISOPastDate = ({ fieldName }: { fieldName: string }) =>
  z
    .string({
      invalid_type_error: `${fieldName} must be string`,
      required_error: `${fieldName} is required.`,
    })
    .refine((input) => validator.isISO8601(input, { strict: true }), {
      message: `${fieldName} must be only in ISO 8601 (e.g., "2025-05-25T00:00:00Z").`,
    })
    .refine((input) => validator.isAfter(input), {
      message: `${fieldName} must be only in the past.`,
    })
    .transform((input) => new Date(input));

export const setDefaultFalse = ({ fieldName }: { fieldName: string }) =>
  z.coerce
    .boolean({ invalid_type_error: `${fieldName} must be a boolean.` })
    .default(false);

export const setDefaultTrue = ({ fieldName }: { fieldName: string }) =>
  z.coerce
    .boolean({ invalid_type_error: `${fieldName} must be a boolean.` })
    .default(true);

export const setCreatedAtMin = (fieldName: string = 'createdAtMin') =>
  setISOPastDate({ fieldName });
export const setCreatedAtMax = (fieldName: string = 'createdAtMax') =>
  setISOFutureDate({ fieldName });

export const setUpdatedAtMin = (fieldName: string = 'updatedAtMin') =>
  setISOPastDate({ fieldName });
export const setUpdatedAtMax = (fieldName: string = 'updatedAtMax') =>
  setISOFutureDate({ fieldName });
