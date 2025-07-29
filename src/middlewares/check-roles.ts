import { NextFunction, Response } from 'express';

import { AuthRequest } from '../types/auth';
import { UserRole } from '../types/user';
import { ForbiddenError, UnauthorizedError } from '../utils/app-error';

export const checkRoles = (roles: UserRole[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const payload = req.payload;

      if (!payload) {
        throw new UnauthorizedError('User not authenticated.');
      }

      if (!roles.includes(payload.role)) {
        throw new ForbiddenError('Unauthorized role.');
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
