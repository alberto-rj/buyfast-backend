import { Request, Response, NextFunction } from 'express';

import { AppError, InternalServerError } from '../utils/app-error';
import { isDevelopmentEnv } from '../config/env';

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
