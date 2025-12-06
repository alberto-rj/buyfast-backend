import { OpenAPIV3 } from 'openapi-types';

export const loginPath: OpenAPIV3.PathsObject = {
  '/auth/login': {
    post: {
      tags: ['Auth'],
      summary: 'Login user',
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
          description: 'Logged',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/LoginResponse',
              },
            },
          },
        },
        '404': {
          description: 'Identifier or password do not match',
        },
      },
    },
  },
};
