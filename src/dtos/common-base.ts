import validator from 'validator';
import { z } from 'zod';

export const search = ({
  fieldName = 'search',
  defaultValue = '',
}: {
  fieldName: string;
  defaultValue: string;
}) =>
  z
    .string({ invalid_type_error: `${fieldName} must be a string.` })
    .default(defaultValue);

export const sortOrder = ({
  fieldName = 'sortOrder',
  defaultValue,
}: {
  fieldName: string;
  defaultValue: 'asc' | 'desc';
}) =>
  z
    .enum(['asc', 'desc'], {
      invalid_type_error: `${fieldName} must be a string.`,
      message: `${fieldName} must be "asc" or "desc".`,
    })
    .default(defaultValue);

export const limit =
  ({
    fieldName = 'limit',
    minValue = 1,
    maxValue = 60,
    defaultValue = 20,
  }: {
    fieldName: string;
    minValue: number;
    maxValue: number;
    defaultValue: number;
  }) =>
  () =>
    z.coerce
      .number({
        invalid_type_error: `${fieldName} must be a number.`,
      })
      .int({ message: `${fieldName} must be an integer.` })
      .min(minValue, { message: `${fieldName} must at least ${minValue}.` })
      .max(maxValue, { message: `${fieldName} cannot exceed ${maxValue}.` })
      .default(defaultValue);

export const page = ({
  fieldName = 'page',
  minValue = 1,
  defaultValue = 1,
}: {
  fieldName: string;
  minValue: number;
  defaultValue: number;
}) =>
  z.coerce
    .number({
      invalid_type_error: `${fieldName} must be a number.`,
    })
    .int({ message: `${fieldName} must be an integer.` })
    .min(minValue, { message: `${fieldName} must be at least ${minValue}.` })
    .default(defaultValue);

export const uuid = (fieldName: string = 'id') =>
  z.string({ required_error: `${fieldName} is required.` }).uuid({
    message: `${fieldName} must be a valid UUID v4 (e.g., "123e4567-e89b-12d3-a456-426614174000").`,
  });

export const imageURL = ({
  fieldName = 'image',
  fileName = 'image',
}: {
  fieldName: string;
  fileName: string;
}) =>
  z
    .string({ required_error: 'coverImage is required.' })
    .refine((value) => validator.isURL(value), {
      message: `${fieldName} must be a valid URL (e.g., "https://example.com/${fileName}.png").`,
    });

export const isoDate = ({ fieldName }: { fieldName: string }) =>
  z
    .string({
      invalid_type_error: `${fieldName} must be string`,
      required_error: `${fieldName} is required.`,
    })
    .refine((value) => validator.isISO8601(value, { strict: true }), {
      message: `${fieldName} must be only in ISO 8601 (e.g., "2025-05-25T00:00:00Z").`,
    })
    .transform((value) => new Date(value));

export const isoFutureDate = ({ fieldName }: { fieldName: string }) =>
  z
    .string({
      invalid_type_error: `${fieldName} must be string`,
      required_error: `${fieldName} is required.`,
    })
    .refine((value) => validator.isISO8601(value, { strict: true }), {
      message: `${fieldName} must be only in ISO 8601 (e.g., "2025-05-25T00:00:00Z").`,
    })
    .refine((value) => validator.isAfter(value), {
      message: `${fieldName} must be only in the future.`,
    })
    .transform((value) => new Date(value));

export const isoPastDate = ({ fieldName }: { fieldName: string }) =>
  z
    .string({
      invalid_type_error: `${fieldName} must be string`,
      required_error: `${fieldName} is required.`,
    })
    .refine((value) => validator.isISO8601(value, { strict: true }), {
      message: `${fieldName} must be only in ISO 8601 (e.g., "2025-05-25T00:00:00Z").`,
    })
    .refine((value) => validator.isBefore(value), {
      message: `${fieldName} must be only in the past.`,
    })
    .transform((value) => new Date(value));

export const defaultFalse = ({ fieldName }: { fieldName: string }) =>
  z.coerce
    .boolean({ invalid_type_error: `${fieldName} must be a boolean.` })
    .default(false);

export const defaultTrue = ({ fieldName }: { fieldName: string }) =>
  z.coerce
    .boolean({ invalid_type_error: `${fieldName} must be a boolean.` })
    .default(true);

export const createdAtMin = isoDate({ fieldName: 'createdAtMin' });

export const createdAtMax = isoDate({ fieldName: 'createdAtMax' });

export const updatedAtMin = isoDate({ fieldName: 'updatedAtMin' });

export const updatedAtMax = isoDate({ fieldName: 'updatedAtMax' });
