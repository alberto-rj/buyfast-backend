import { OpenAPIV3 } from 'openapi-types';

export const adminOrderPath: OpenAPIV3.PathsObject = {
  'admin/orders/{id}': {
    get: {
      tags: ['Orders - Admin'],
      summary: 'Get order details',
      description:
        'Returns full details for a specific order. Users may only access their own orders.',
      operationId: 'getOrderById',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'string', format: 'uuid' },
        },
      ],
      responses: {
        '200': {
          description: 'Order details',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/OrderDetailedResponse',
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
        '404': {
          description: 'Order not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorDetailedResponse',
              },
            },
          },
        },
      },
    },
  },
};
