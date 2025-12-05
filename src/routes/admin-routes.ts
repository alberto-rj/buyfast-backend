import { Router } from 'express';

import { orderController } from '../controllers';
import { authenticate, requireAdmin } from '../middlewares';

export const adminRoutes = Router();

adminRoutes.get(
  '/orders',
  authenticate,
  requireAdmin,
  orderController.getAll.bind(orderController),
);

adminRoutes.patch(
  '/orders/:id/status',
  authenticate,
  requireAdmin,
  orderController.updateStatus.bind(orderController),
);
