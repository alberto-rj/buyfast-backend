import { OpenAPIV3 } from 'openapi-types';

export const createCategoryPath: OpenAPIV3.PathItemObject = {
  post: {
    tags: ['Categories'],
    summary: 'Create category',
    description: 'Create category.',
    operationId: 'createCategory',
    security: [{ bearerAuth: [] }],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/CreateCategoryRequest',
          },
        },
      },
    },
    responses: {
      '200': {
        description: 'Categories',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/CategoryResponse',
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
