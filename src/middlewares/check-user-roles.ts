import { Request, Response, NextFunction } from 'express';
import { AppError } from '@/utils/app-error';

export function checkUserRoles(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      throw new AppError('User not authenticated', 401);
    }

    if (roles.includes(req.user.role)) {
      throw new AppError('User cannot access the resources', 403);
    }

    return next();
  };
}
