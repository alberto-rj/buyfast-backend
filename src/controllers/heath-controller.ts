import { Request, Response, NextFunction } from 'express';

import { NODE_ENV } from '../config';

const check = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({
      success: true,
      data: {
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        environment: NODE_ENV,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const healthController = {
  check,
};
