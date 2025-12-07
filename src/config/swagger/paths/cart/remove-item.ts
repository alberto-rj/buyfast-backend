import { OpenAPIV3 } from 'openapi-types';

export const removeCartItemPath: OpenAPIV3.PathItemObject = {
  delete: {
    tags: ['Cart'],
    summary: 'Remove cart item',
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        in: 'path',
        name: 'id',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
        },
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
      '204': {
        description: 'Item removed',
      },
      '401': { description: 'Not authenticated' },
    },
  },
};
