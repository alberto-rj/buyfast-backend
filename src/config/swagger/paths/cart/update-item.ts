import { OpenAPIV3 } from 'openapi-types';

export const updateCartItemPath: OpenAPIV3.PathsObject = {
  '/cart/items/{id}': {
    patch: {
      tags: ['Cart'],
      summary: 'Update cart item quantity',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'string', format: 'uuid' },
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UpdateCartItemRequest',
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Item updated',
        },
        '401': { description: 'Not authenticated' },
      },
    },
  },
};
