import { Router } from 'express';

import { authenticate, checkRoles } from '../middlewares';
import { categoryController } from '../controllers';

export const categoryRoutes = Router();

categoryRoutes.use(authenticate, checkRoles(['Admin']));

categoryRoutes
  .route('/')
  .get(categoryController.findMany.bind(categoryController))
  .post(categoryController.create.bind(categoryController));

categoryRoutes
  .route('/:id/')
  .get(categoryController.find.bind(categoryController))
  .patch(categoryController.update.bind(categoryController))
  .delete(categoryController.remove.bind(categoryController));

categoryRoutes
  .route('/:id/is-active')
  .patch(categoryController.updateIsActive.bind(categoryController));
