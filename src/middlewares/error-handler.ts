import { Request, Response, NextFunction } from 'express';

import { AppError, cleanupOnError, InternalServerError } from '../utils';
import { isDevelopmentEnv } from '../config';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  cleanupOnError();

  const customError: AppError =
    error instanceof AppError ? error : new InternalServerError();

  if (isDevelopmentEnv) {
    console.error(error);
  }

  res.status(customError.statusCode).json(customError.format());
};
