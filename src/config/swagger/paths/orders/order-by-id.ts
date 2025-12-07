import { OpenAPIV3 } from 'openapi-types';

export const orderByIdPath: OpenAPIV3.PathsObject = {
  '/orders/{id}': {
    get: {
      tags: ['Orders'],
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
        '200': { description: 'Order details' },
        '401': { description: 'Not authenticated' },
        '403': { description: 'Forbidden' },
        '404': { description: 'Order not found' },
      },
    },
  },
};
