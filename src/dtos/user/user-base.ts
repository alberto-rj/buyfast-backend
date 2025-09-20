import validator from 'validator';
import { z } from 'zod';

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
import { UserRole } from '../../types';

export const id = setUUID();

export const firstName = z
  .string({
    error: 'firstName must be string.',
  })
  .min(2, { error: 'firstName must have at least 2 characters.' })
  .max(50, { error: 'firstName cannot exceed 50 characters.' });

export const lastName = z
  .string({
    error: 'lastName must be string.',
  })
  .min(2, { error: 'lastName must have at least 2 characters.' })
  .max(50, { error: 'lastName cannot exceed 50 characters.' });

export const username = z
  .string({
    error: 'username must be a string.',
  })
  .min(3, { error: 'username must be at least 3 characters.' })
  .max(20, { error: 'username cannot exceed 20 characters.' })
  .refine(input => validator.isAlphanumeric(input, 'en-US', { ignore: '_' }), {
    error:
      'username only must includes uppercase letters, lowercase letters, numbers and underscore.',
  });

export const email = z
  .email({
    error: 'email must be a valid address (e.g., "name@example.com").',
  })
  .max(80, { error: 'email cannot exceed 80 characters.' });

export const role = z
  .enum([UserRole.Admin, UserRole.Customer], {
    error: 'role must be only "Admin" or "Customer".',
  })
  .default('Customer');

export const isActive = setDefaultTrue({ fieldName: 'isActive' });

export const password = z
  .string({
    error: 'password must be a string.',
  })
  .refine(
    input =>
      validator.isStrongPassword(input, {
        minUppercase: 1,
        minLowercase: 1,
        minNumbers: 2,
        minSymbols: 2,
      }),
    {
      error:
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
    error: 'identifier must be string.',
  })
  .min(1, { error: 'identifier cannot be empty.' })
  .refine(input => isValidIdentifier(input), {
    error: 'identifier must be a valid email or username.',
  });

export const refreshToken = z
  .string({
    error: 'refreshToken must be string.',
  })
  .min(1, { error: 'refreshToken cannot be empty.' });

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
      error:
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
