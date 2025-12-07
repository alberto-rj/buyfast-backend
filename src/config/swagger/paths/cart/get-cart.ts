import { OpenAPIV3 } from 'openapi-types';

export const getCartPath: OpenAPIV3.PathItemObject = {
  get: {
    tags: ['Cart'],
    summary: 'Get user cart',
    security: [{ bearerAuth: [] }],
    responses: {
      '200': {
        description: 'User cart',
      },
      '401': {
        description: 'Not authenticated',
      },
    },
  },
};
