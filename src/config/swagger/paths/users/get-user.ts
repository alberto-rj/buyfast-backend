import { OpenAPIV3 } from 'openapi-types';

export const getUserPath: OpenAPIV3.PathItemObject = {
  get: {
    tags: ['Users'],
    summary: 'Get user',
    description: 'Returns Category.',
    operationId: 'getCategory',
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
