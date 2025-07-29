import { Express } from 'express';

import {
  authRoutes,
  categoryRoutes,
  healthRoutes,
  userRoutes,
  productRoutes,
} from '../routes';
import { errorHandler, notFoundHandler } from '../middlewares';

export const setupRoutes = (app: Express) => {
  app.use('/api/health', healthRoutes);
  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/categories', categoryRoutes);
  app.use('/api/products', productRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);
};
