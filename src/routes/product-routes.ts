import { Router } from 'express';

import { PRODUCT_MAX_FILE_COUNT } from '../config';
import { productController } from '../controllers';
import { authenticate, product, requireAdmin } from '../middlewares';

export const productRoutes = Router();

productRoutes
  .route('/')
  .get(productController.findMany.bind(productController))
  .post(
    authenticate,
    requireAdmin,
    productController.create.bind(productController),
  );

productRoutes
  .route('/:id')
  .get(productController.find.bind(productController))
  .patch(
    authenticate,
    requireAdmin,
    productController.update.bind(productController),
  )
  .delete(
    authenticate,
    requireAdmin,
    productController.remove.bind(productController),
  );

productRoutes.patch(
  '/:id/is-active',
  authenticate,
  requireAdmin,
  productController.updateIsActive.bind(productController),
);

productRoutes
  .route('/:id/images')
  .post(
    authenticate,
    requireAdmin,
    product.upload.array('images', PRODUCT_MAX_FILE_COUNT),
    product.handleUploadError,
    productController.uploadImages.bind(productController),
  )
  .get(productController.getImages.bind(productController))
  .delete(
    authenticate,
    requireAdmin,
    productController.removeImages.bind(productController),
  );

productRoutes.delete(
  '/:id/images/:imageId',
  authenticate,
  requireAdmin,
  productController.removeImage.bind(productController),
);
