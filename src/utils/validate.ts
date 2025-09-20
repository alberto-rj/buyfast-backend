import { ZodError, ZodObject } from 'zod';

import { ValidationError } from '../utils';

export const validate = <T>(schema: ZodObject, data: unknown): T => {
  try {
    return schema.parse(data) as T;
  } catch (error) {
    if (error instanceof ZodError) {
      throw new ValidationError(
        error.issues.map(issue => ({
          path: issue.path.join('.'),
          message: issue.message,
        })),
      );
    }

    throw error;
  }
};
