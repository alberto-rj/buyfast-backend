import { OpenAPIV3 } from 'openapi-types';

export const updateCategoryPath: OpenAPIV3.PathsObject = {
  '/categories/{id}': {
    patch: {
      tags: ['Categories'],
      summary: 'Get product category',
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
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UpdateCategoryRequest',
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
                $ref: '#/components/schemas/Category',
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
      },
    },
  },
};
