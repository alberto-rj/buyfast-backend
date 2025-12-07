import { OpenAPIV3 } from 'openapi-types';

export const cancelOrderPath: OpenAPIV3.PathItemObject = {
  patch: {
    tags: ['Orders'],
    summary: 'Cancel Order',
    description:
      'Updates the status of an order to Cancelled. Only valid transitions are allowed.',
    operationId: 'updateOrderStatus',
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        in: 'path',
        name: 'id',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    responses: {
      '200': {
        description: 'Status updated successfully',
      },
      '400': {
        description: 'Invalid status transition',
      },
      '401': {
        description: 'Not authenticated',
      },
      '404': {
        description: 'Order not found',
      },
    },
  },
};
