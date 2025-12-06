import { OpenAPIV3 } from 'openapi-types';

export const deleteCategoryPath: OpenAPIV3.PathsObject = {
  '/categories/{id}': {
    delete: {
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
      ],
      responses: {
        '204': {
          description: 'Categories',
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
