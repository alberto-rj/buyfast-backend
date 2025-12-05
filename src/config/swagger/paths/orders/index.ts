import { OpenAPIV3 } from 'openapi-types';

import { createOrderPath } from './order-create';
import { userOrdersPath } from './user-orders';
import { orderByIdPath } from './order-by-id';
import { adminOrdersPath } from './admin-orders';
import { updateOrderStatusPath } from './order-update-status';

export const orderPaths: OpenAPIV3.PathsObject = {
  ...createOrderPath,
  ...userOrdersPath,
  ...orderByIdPath,
  ...adminOrdersPath,
  ...updateOrderStatusPath,
};
