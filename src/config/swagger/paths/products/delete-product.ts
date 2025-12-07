import { OpenAPIV3 } from 'openapi-types';

export const deleteProductPath: OpenAPIV3.PathItemObject = {
  delete: {
    tags: ['Products'],
    summary: 'Delete product',
    description: 'Deletes a product by ID.',
    operationId: 'deleteProduct',
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
      '204': {
        description: 'Product successfully deleted',
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
        description: 'Product not found',
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
