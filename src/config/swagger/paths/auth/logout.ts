import { OpenAPIV3 } from 'openapi-types';

export const logoutPath: OpenAPIV3.PathItemObject = {
  post: {
    tags: ['Auth'],
    summary: 'Logout user',
    description:
      'Logs out the user by clearing the refresh token cookie or invalidating the refresh token.',
    operationId: 'logoutUser',
    responses: {
      '204': {
        description: 'Logged out successfully',
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
