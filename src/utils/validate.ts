import { AnyZodObject, ZodError } from 'zod';

import { ValidationError } from '../utils/app-error';

export const validate = <T>(schema: AnyZodObject, data: unknown): T => {
  try {
    return schema.parse(data) as T;
  } catch (error) {
    if (error instanceof ZodError) {
      throw new ValidationError(
        error.errors.map((err) => ({
          path: err.path.join('.'),
          message: err.message,
        })),
      );
    }

    throw error;
  }
};
