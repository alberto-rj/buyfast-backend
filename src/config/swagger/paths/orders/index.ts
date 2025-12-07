import { OpenAPIV3 } from 'openapi-types';

import { createOrderPath } from './order-create';
import { userOrdersPath } from './get-orders';
import { getOrderPath } from './get-order';
import { adminOrdersPath } from './admin-orders';
import { updateOrderStatusPath } from './update-order-status';
import { adminOrderPath } from './admin-order';
import { cancelOrderPath } from './cancel-order';

export const orderPaths: OpenAPIV3.PathsObject = {
  '/orders': {
    ...createOrderPath,
    ...userOrdersPath,
  },
  '/orders/{id}': {
    ...userOrdersPath,
    ...getOrderPath,
  },
  '/orders/{id}/status/cancelled': {
    ...cancelOrderPath,
  },
  '/admin/orders': {
    ...adminOrdersPath,
  },
  '/admin/orders/{id}': {
    ...adminOrderPath,
  },
  '/admin/orders/{id}/status': {
    ...updateOrderStatusPath,
  },
};
