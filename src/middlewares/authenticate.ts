import { Response, NextFunction } from 'express';

import { AuthRequest } from '../types/auth';
import { UnauthorizedError } from '../utils/app-error';
import { verifyAccessToken } from '../utils/jwt';

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authorization = req.headers['authorization'];

    if (!authorization) {
      throw new UnauthorizedError('Access token is required.');
    }

    if (!authorization.startsWith('Bearer')) {
      throw new UnauthorizedError('Access token is invalid.');
    }

    const [, token] = authorization.split(' ');

    if (token.trim().length === 0) {
      throw new UnauthorizedError('Access token is required.');
    }

    const payload = verifyAccessToken(token);

    if (!payload) {
      throw new UnauthorizedError('Access token is invalid or expired.');
    }

    req.payload = payload;
    next();
  } catch (error) {
    next(error);
  }
};
