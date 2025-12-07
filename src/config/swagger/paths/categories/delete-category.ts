import { OpenAPIV3 } from 'openapi-types';

export const deleteCategoryPath: OpenAPIV3.PathItemObject = {
  delete: {
    tags: ['Categories'],
    summary: 'Delete category',
    description: 'Deletes a category by ID.',
    operationId: 'deleteCategory',
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        in: 'path',
        name: 'id',
        required: true,
        description: 'Category ID',
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
      {
        in: 'query',
        name: 'includeInactive',
        required: false,
        description: 'Whether to include inactive categories',
        schema: {
          type: 'boolean',
          default: false,
        },
      },
    ],
    responses: {
      '204': {
        description: 'Category successfully deleted',
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
        description: 'Category not found',
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
