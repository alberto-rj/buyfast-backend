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
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedError('Access token is required.');
    }

    if (!authHeader.startsWith('Bearer')) {
      throw new UnauthorizedError('Access token is invalid.');
    }

    const [, token] = authHeader.split(' ');

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
