import { OpenAPIV3 } from 'openapi-types';

export const registerPath: OpenAPIV3.PathItemObject = {
  post: {
    tags: ['Auth'],
    summary: 'Register user',
    description: 'Creates a new user.',
    operationId: 'register',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/RegisterRequest',
          },
        },
      },
    },
    responses: {
      '201': {
        description: 'User created successfully',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/AuthResponse' },
          },
        },
      },
      '409': {
        description: 'Email or username already exists',
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
