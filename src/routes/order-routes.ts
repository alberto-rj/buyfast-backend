import { Router } from 'express';

import { orderController } from '../controllers';
import { authenticate } from '../middlewares';

export const orderRoutes = Router();

orderRoutes
  .route('/')
  .post(authenticate, orderController.create.bind(orderController))
  .get(authenticate, orderController.getAllOf.bind(orderController));

orderRoutes.get(
  '/:id',
  authenticate,
  orderController.getOf.bind(orderController),
);

orderRoutes.patch(
  '/:id/status/cancelled',
  authenticate,
  orderController.cancel.bind(orderController),
);
