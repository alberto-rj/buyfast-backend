import { Express } from 'express';

import { authRoutes } from './auth-routes';
import { healthRoutes } from './health-routes';
import { errorHandler } from '../middlewares/error-handler';
import { notFoundHandler } from '../middlewares/not-found-handler';

export const setupRoutes = (app: Express) => {
  app.use('/api/auth', authRoutes);
  app.use('/api/health', healthRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);
};
