import { OpenAPIV3 } from 'openapi-types';

export const clearCartPath: OpenAPIV3.PathsObject = {
  '/cart': {
    delete: {
      tags: ['Cart'],
      summary: 'Clear cart',
      security: [{ bearerAuth: [] }],
      responses: {
        '204': {
          description: 'Cart clean successfully',
        },
        '401': {
          description: 'Not authenticated',
        },
      },
    },
  },
};
