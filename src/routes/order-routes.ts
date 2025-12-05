import { Router } from 'express';

import { orderController } from '../controllers';
import { authenticate, requireAdmin } from '../middlewares';

export const orderRoutes = Router();

orderRoutes
  .route('/')
  .post(authenticate, orderController.create.bind(orderController))
  .get(authenticate, orderController.getAll.bind(orderController));

orderRoutes
  .route('/:id')
  .get(authenticate, orderController.get.bind(orderController))
  .patch(
    authenticate,
    requireAdmin,
    orderController.updateStatus.bind(orderController),
  );
