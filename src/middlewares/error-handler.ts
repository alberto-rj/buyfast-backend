import { Request, Response, NextFunction } from 'express';

import resBody from '../utils/response-body';
import { AppError } from '../utils/app-error';
import { isDevelopmentEnv } from '../config/env';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (isDevelopmentEnv) console.error(error);

  if (error instanceof AppError) {
    res.status(error.statusCode).json(error.format());
    return;
  }

  res.status(500).json(
    resBody.error({
      status: 500,
      name: 'InternalServerError',
      message: 'Unexpected error',
    }),
  );
};
