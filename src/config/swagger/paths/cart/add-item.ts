import { OpenAPIV3 } from 'openapi-types';

export const addCartItemPath: OpenAPIV3.PathItemObject = {
  post: {
    tags: ['Cart'],
    summary: 'Add item to cart',
    security: [{ bearerAuth: [] }],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/AddCartItemRequest',
          },
        },
      },
    },
    responses: {
      '201': {
        description: 'Item added to the cart',
      },
      '401': { description: 'Not authenticated' },
    },
  },
};
