import { OpenAPIV3 } from 'openapi-types';

export const userOrdersPath: OpenAPIV3.PathsObject = {
  '/orders': {
    get: {
      tags: ['Orders'],
      summary: 'List user orders',
      description:
        'Returns a paginated list of the authenticated user’s orders.',
      operationId: 'getUserOrders',
      security: [{ bearerAuth: [] }],
      parameters: [
        { in: 'query', name: 'page', schema: { type: 'integer', default: 1 } },
        {
          in: 'query',
          name: 'limit',
          schema: { type: 'integer', default: 10 },
        },
        {
          in: 'query',
          name: 'status',
          schema: {
            type: 'string',
            enum: [
              'Pending',
              'Processing',
              'Shipped',
              'Delivered',
              'Cancelled',
            ],
          },
        },
      ],
      responses: {
        '200': {
          description: 'List of orders',
        },
        '401': {
          description: 'Not authenticated',
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
  },
};
