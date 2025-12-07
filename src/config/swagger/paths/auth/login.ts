import { OpenAPIV3 } from 'openapi-types';

export const loginPath: OpenAPIV3.PathItemObject = {
  post: {
    tags: ['Auth'],
    summary: 'Authenticate user',
    description: 'Authenticates a user and returns access and refresh tokens.',
    operationId: 'login',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/LoginRequest',
          },
        },
      },
    },
    responses: {
      '200': {
        description: 'User authenticated successfully',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/AuthResponse' },
          },
        },
      },
      '401': {
        description: 'Invalid credentials',
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
