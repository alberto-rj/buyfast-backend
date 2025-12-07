import { OpenAPIV3 } from 'openapi-types';

export const adminOrdersPath: OpenAPIV3.PathItemObject = {
  get: {
    tags: ['Orders'],
    summary: 'List all orders (Admin)',
    description: 'Returns a paginated list of all orders in the system.',
    operationId: 'getAllOrders',
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        in: 'query',
        name: 'page',
        schema: {
          type: 'integer',
          default: 1,
        },
      },
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
          enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        },
      },
    ],
    responses: {
      '200': {
        description: 'Order list',
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
    },
  },
};
