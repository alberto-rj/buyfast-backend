import { Router } from 'express';

import { productController } from '../controllers';
import { authenticate, checkRoles } from '../middlewares';

export const productRoutes = Router();

productRoutes.get('/', productController.findMany.bind(productController));

productRoutes.get('/:id', productController.find.bind(productController));

productRoutes.post(
  '/',
  authenticate,
  checkRoles(['Admin']),
  productController.create.bind(productController),
);

productRoutes.patch(
  '/:id',
  authenticate,
  checkRoles(['Admin']),
  productController.update.bind(productController),
);

productRoutes.delete(
  '/:id',
  authenticate,
  checkRoles(['Admin']),
  productController.remove.bind(productController),
);

productRoutes.patch(
  '/:id/is-active',
  authenticate,
  checkRoles(['Admin']),
  productController.updateIsActive.bind(productController),
);
