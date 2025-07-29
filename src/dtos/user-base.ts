import validator from 'validator';
import { z } from 'zod';

import { uuid } from './common-base';
import { UserRole } from '../types/user';

export const id = uuid();

export const firstName = z
  .string({
    required_error: 'firstName is required.',
    invalid_type_error: 'firstName must be string.',
  })
  .min(1, { message: 'firstName cannot be empty.' })
  .max(50, { message: 'firstName cannot exceed 50 characters.' });

export const lastName = z
  .string({
    required_error: 'lastName is required.',
    invalid_type_error: 'lastName must be string',
  })
  .min(1, { message: 'lastName cannot be empty.' })
  .max(50, { message: 'lastName cannot exceed 50 characters.' });

export const username = z
  .string({
    required_error: 'username is required.',
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
    required_error: 'email is required.',
    invalid_type_error: 'email must be a string.',
  })
  .max(60, { message: 'email cannot exceed 60 characters.' })
  .email({
    message: 'email must be a valid address (e.g., "name@example.com").',
  });

export const role = z
  .enum([UserRole.CLIENT, UserRole.ADMIN], {
    required_error: 'role must be only "ADMIN" or "CLIENT".',
  })
  .default('CLIENT');

export const password = z
  .string({
    required_error: 'password is required.',
    invalid_type_error: 'password must be a string.',
  })
  .refine(
    (input) =>
      validator.isStrongPassword(input, {
        minUppercase: 2,
        minLowercase: 2,
        minNumbers: 2,
        minSymbols: 2,
      }),
    {
      message:
        'password must have at least 8 characters, including 2 uppercase letters, 2 lowercase letters, 2 numbers, and 2 symbols.',
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
    required_error: 'identifier is required.',
    invalid_type_error: 'identifier must be string.',
  })
  .min(1, { message: 'identifier cannot be empty.' })
  .refine((input) => isValidIdentifier(input), {
    message: 'identifier must be either a valid email or email.',
  });
