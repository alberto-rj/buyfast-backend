import { NextFunction, Response } from 'express';

import { AuthRequest, UserRole } from '../types';
import { ForbiddenError, UnauthorizedError } from '../utils';

export const checkRoles = (roles: UserRole[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const payload = req.payload;

      if (!payload) {
        throw new UnauthorizedError('User not authenticated.');
      }

      if (!roles.includes(payload.role)) {
        throw new ForbiddenError('Access denied. Admin role is required.');
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
