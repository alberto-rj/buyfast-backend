import { OpenAPIV3 } from 'openapi-types';

export const refreshPath: OpenAPIV3.PathItemObject = {
  post: {
    tags: ['Auth'],
    summary: 'Refresh access token',
    description:
      'Returns a new access token using the refresh token (usually provided via httpOnly cookie).',
    operationId: 'refreshToken',
    responses: {
      '200': {
        description: 'New access token generated successfully',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/AuthResponse' },
          },
        },
      },
      '401': {
        description: 'Invalid or expired refresh token',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' },
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
