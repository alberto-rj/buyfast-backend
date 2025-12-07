import { OpenAPIV3 } from 'openapi-types';

export const getProductPath: OpenAPIV3.PathItemObject = {
  get: {
    tags: ['Products'],
    summary: 'Get product product',
    description: 'Returns Product.',
    operationId: 'getProduct',
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        in: 'path',
        name: 'id',
        required: true,
        description: 'Product ID',
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
      {
        in: 'query',
        name: 'includeInactive',
        required: false,
        description: 'Whether to include inactive products',
        schema: {
          type: 'boolean',
          default: false,
        },
      },
    ],
    responses: {
      '200': {
        description: 'Products',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ProductResponse',
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
              $ref: '#/components/schemas/ErrorResponse',
            },
          },
        },
      },
      '500': {
        description: 'Internal server error',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' },
          },
        },
      },
    },
  },
};
