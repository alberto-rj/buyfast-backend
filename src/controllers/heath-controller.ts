import { Request, Response, NextFunction } from 'express';

export const check = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({
      success: true,
      data: {
        uptime: process.uptime(),
        timeStamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    next(error);
  }
};
