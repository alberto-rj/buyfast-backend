import validator from 'validator';
import { z } from 'zod';

import {
  setMaxCreatedAt,
  setMinCreatedAt,
  setDefaultTrue,
  setLimit,
  setPage,
  setSearch,
  setOrder,
  setMaxUpdatedAt,
  setMinUpdatedAt,
  setUUID,
  setDefaultFalse,
} from '..';
import { UserRole } from '../../types';

export const id = setUUID();

export const firstName = z
  .string({
    required_error: 'firstName must be provided.',
    invalid_type_error: 'firstName must be string.',
  })
  .min(2, { message: 'firstName must have at least 2 characters.' })
  .max(50, { message: 'firstName cannot exceed 50 characters.' });

export const lastName = z
  .string({
    required_error: 'lastName must be provided.',
    invalid_type_error: 'lastName must be string.',
  })
  .min(2, { message: 'lastName must have at least 2 characters.' })
  .max(50, { message: 'lastName cannot exceed 50 characters.' });

export const username = z
  .string({
    required_error: 'username must be provided.',
    invalid_type_error: 'username must be a string.',
  })
  .min(3, { message: 'username must be at least 3 characters.' })
  .max(20, { message: 'username cannot exceed 20 characters.' })
  .refine(
    (input) => validator.isAlphanumeric(input, 'en-US', { ignore: '_' }),
    {
      message:
        'username only must includes uppercase letters, lowercase letters, numbers and underscore.',
    },
  );

export const email = z
  .string({
    required_error: 'email must be provided.',
    invalid_type_error: 'email must be a string.',
  })
  .max(80, { message: 'email cannot exceed 80 characters.' })
  .email({
    message: 'email must be a valid address (e.g., "name@example.com").',
  });

export const role = z
  .enum([UserRole.Admin, UserRole.Customer], {
    invalid_type_error: 'role must be only "Admin" or "Customer".',
  })
  .default('Customer');

export const isActive = setDefaultTrue({ fieldName: 'isActive' });

export const password = z
  .string({
    required_error: 'password must be provided.',
    invalid_type_error: 'password must be a string.',
  })
  .refine(
    (input) =>
      validator.isStrongPassword(input, {
        minUppercase: 1,
        minLowercase: 1,
        minNumbers: 2,
        minSymbols: 2,
      }),
    {
      message:
        'password must have at least 6 characters, including 1 uppercase letter, 1 lowercase letter, 2 numbers, and 2 symbols.',
    },
  );

const isValidEmail = (input: string) => {
  try {
    email.parse(input);
    return true;
  } catch (error) {
    return false;
  }
};

const isValidUsername = (input: string) => {
  try {
    username.parse(input);
    return true;
  } catch (error) {
    return false;
  }
};

const isValidIdentifier = (input: string) => {
  return isValidEmail(input) || isValidUsername(input);
};

export const identifier = z
  .string({
    required_error: 'identifier must be provided.',
    invalid_type_error: 'identifier must be string.',
  })
  .min(1, { message: 'identifier cannot be empty.' })
  .refine((input) => isValidIdentifier(input), {
    message: 'identifier must be a valid email or username.',
  });

export const refreshToken = z
  .string({
    required_error: 'refreshToken must be provided.',
    invalid_type_error: 'refreshToken must be string.',
  })
  .min(1, { message: 'refreshToken cannot be empty.' });

export const limit = setLimit();

export const page = setPage();

export const sortBy = z
  .enum(
    [
      'firstName',
      'lastName',
      'email',
      'username',
      'role',
      'createdAt',
      'updatedAt',
    ],
    {
      invalid_type_error: 'sortedBy must be string.',
      message:
        'sortedBy must be "firstName", "lastName", "email", "username", "role", "createdAt" or "updatedAt".',
    },
  )
  .default('createdAt');

export const order = setOrder({ defaultValue: 'desc' });

export const search = setSearch({ defaultValue: '' });

export const minCreatedAt = setMinCreatedAt();

export const maxCreatedAt = setMaxCreatedAt();

export const minUpdatedAt = setMinUpdatedAt();

export const maxUpdatedAt = setMaxUpdatedAt();

export const includeInactive = setDefaultFalse({
  fieldName: 'includeInactive',
});
