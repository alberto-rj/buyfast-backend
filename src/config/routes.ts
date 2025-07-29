import { Express } from 'express';

import {
  healthRoutes,
  authRoutes,
  userRoutes,
  categoryRoutes,
  productRoutes,
  cartRoutes,
} from '../routes';
import { errorHandler, notFoundHandler } from '../middlewares';

export const setupRoutes = (app: Express) => {
  app.use('/api/health', healthRoutes);
  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/categories', categoryRoutes);
  app.use('/api/products', productRoutes);
  app.use('/api/cart', cartRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);
};
