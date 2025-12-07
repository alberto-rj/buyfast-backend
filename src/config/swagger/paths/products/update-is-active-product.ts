import { OpenAPIV3 } from 'openapi-types';

export const updateIsActiveProductPath: OpenAPIV3.PathItemObject = {
  patch: {
    tags: ['Products'],
    summary: 'Update product product',
    description: 'Updates a product and returns the updated record.',
    operationId: 'updateProduct',
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
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/UpdateProductRequest',
          },
        },
      },
    },
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
