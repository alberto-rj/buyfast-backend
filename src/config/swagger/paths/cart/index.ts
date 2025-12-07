import { OpenAPIV3 } from 'openapi-types';

import { getCartPath } from './get-cart';
import { clearCartPath } from './clear-cart';
import { removeCartItemPath } from './remove-item';
import { addCartItemPath } from './add-item';
import { updateCartItemPath } from './update-item';

export const cartPaths: OpenAPIV3.PathsObject = {
  '/cart': {
    ...getCartPath,
    ...clearCartPath,
  },
  '/cart/items': {
    ...addCartItemPath,
  },
  '/cart/items/{id}': {
    ...updateCartItemPath,
    ...removeCartItemPath,
  },
};
