import { Router } from 'express';

import { authenticate } from '../middlewares';
import { cartController } from '../controllers';

export const cartRoutes = Router();

cartRoutes.use(authenticate);

cartRoutes
  .route('/')
  .get(cartController.list.bind(cartController))
  .delete(cartController.clear.bind(cartController));

cartRoutes.route('/items').post(cartController.add.bind(cartController));

cartRoutes
  .route('/items/:id')
  .patch(cartController.update.bind(cartController))
  .delete(cartController.remove.bind(cartController));
