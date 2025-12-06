import { OpenAPIV3 } from 'openapi-types';

export const createOrderPath: OpenAPIV3.PathsObject = {
  '/orders': {
    post: {
      tags: ['Orders'],
      summary: 'Create a new order',
      description:
        'Creates an order using the authenticated user’s cart items. The cart is cleared after the order is created.',
      operationId: 'createOrder',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/CreateOrderRequest',
            },
          },
        },
      },
      responses: {
        '201': {
          description: 'Order successfully created',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean' },
                  data: { $ref: '#/components/schemas/Order' },
                },
              },
            },
          },
        },
        '400': {
          description: 'Empty cart, no stock, or invalid data',
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
