import { OpenAPIV3 } from 'openapi-types';

export const createProductPath: OpenAPIV3.PathItemObject = {
  post: {
    tags: ['Products'],
    summary: 'Create product',
    description: 'Create product.',
    operationId: 'createProduct',
    security: [{ bearerAuth: [] }],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/CreateProductRequest',
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
