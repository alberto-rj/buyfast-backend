import { OpenAPIV3 } from 'openapi-types';

export const uploadProductPath: OpenAPIV3.PathItemObject = {
  post: {
    tags: ['Products'],
    summary: 'Upload product image',
    description: 'Upload product image.',
    operationId: 'uploadProduct',
    security: [{ bearerAuth: [] }],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/UploadProductRequest',
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
