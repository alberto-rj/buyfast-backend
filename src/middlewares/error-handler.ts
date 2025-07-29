import { Request, Response, NextFunction } from 'express';

import { AppError, InternalServerError } from '../utils';
import { isDevelopmentEnv } from '../config';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const customError: AppError =
    error instanceof AppError ? error : new InternalServerError();

  if (isDevelopmentEnv) {
    console.error(error);
  }

  res.status(customError.statusCode).json(customError.format());
};
