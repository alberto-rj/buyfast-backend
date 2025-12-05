import { Router } from 'express';

import { orderController } from '../controllers';
import { authenticate, requireAdmin } from '../middlewares';

export const orderRoutes = Router();

orderRoutes
  .route('/')
  .post(authenticate, orderController.create.bind(orderController))
  .get(authenticate, orderController.getAllOf.bind(orderController));

orderRoutes.get(
  '/:id',
  authenticate,
  orderController.get.bind(orderController),
);

orderRoutes.patch(
  '/:id/cancel',
  authenticate,
  orderController.cancel.bind(orderController),
);
