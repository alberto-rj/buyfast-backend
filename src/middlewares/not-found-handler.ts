import { Request, Response, NextFunction } from 'express';

import { NotFoundError } from '../utils/app-error';

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    throw new NotFoundError('Resource not found.');
  } catch (error) {
    next(error);
  }
};
