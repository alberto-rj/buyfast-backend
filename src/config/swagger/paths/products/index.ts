import { OpenAPIV3 } from 'openapi-types';
import { createProductPath } from './create-product';
import { getProductsPath } from './get-products';
import { getProductPath } from './get-product';
import { updateProductPath } from './update-product';
import { deleteProductPath } from './delete-product';
import { uploadProductPath } from './upload-product-image';
import { deleteProductImagesPath } from './delete-product-images';
import { getProductImagesPath } from './get-product-images';
import { getProductImagePath } from './get-product-image';

export const productPaths: OpenAPIV3.PathsObject = {
  '/products': {
    ...createProductPath,
    ...getProductsPath,
  },
  '/products/{id}': {
    ...getProductPath,
    ...updateProductPath,
    ...deleteProductPath,
  },
  '/products/{id}/images': {
    ...uploadProductPath,
    ...getProductImagesPath,
    ...deleteProductImagesPath,
  },
  '/products/{id}/images/{id}': {
    ...getProductImagePath,
    ...deleteProductImagesPath,
  },
};
