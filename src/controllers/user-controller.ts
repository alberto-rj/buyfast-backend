import { Request, Response, NextFunction } from 'express';

import { toUserLogin } from '../dtos/user-input';

export const login = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = toUserLogin(req);
  } catch (error) {
    next(error);
  }
};
