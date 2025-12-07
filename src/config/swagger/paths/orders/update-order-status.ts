import { OpenAPIV3 } from 'openapi-types';

export const updateOrderStatusPath: OpenAPIV3.PathItemObject = {
  patch: {
    tags: ['Orders'],
    summary: 'Update order status (Admin)',
    description:
      'Updates the status of an order. Only valid transitions are allowed.',
    operationId: 'updateOrderStatus',
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        in: 'path',
        name: 'id',
        required: true,
        schema: { type: 'string', format: 'uuid' },
      },
    ],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/UpdateOrderStatusRequest' },
        },
      },
    },
    responses: {
      '200': {
        description: 'Status updated successfully',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/OrderDetailedResponse',
            },
          },
        },
      },
      '400': {
        description: 'Invalid status transition',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ErrorResponse',
            },
          },
        },
      },
      '401': {
        description: 'Not authenticated',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ErrorResponse',
            },
          },
        },
      },
      '403': {
        description: 'Admin access required',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ErrorResponse',
            },
          },
        },
      },
      '404': {
        description: 'Order not found',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ErrorResponse',
            },
          },
        },
      },
      '500': {
        description: 'Internal server error',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ErrorResponse',
            },
          },
        },
      },
    },
  },
};
