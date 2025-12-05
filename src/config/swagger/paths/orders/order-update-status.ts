import { OpenAPIV3 } from 'openapi-types';

export const updateOrderStatusPath: OpenAPIV3.PathsObject = {
  '/admin/orders/{id}/status': {
    patch: {
      tags: ['Orders - Admin'],
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
        '200': { description: 'Status updated successfully' },
        '400': { description: 'Invalid status transition' },
        '401': { description: 'Not authenticated' },
        '403': { description: 'Admin access required' },
        '404': { description: 'Order not found' },
      },
    },
  },
};
