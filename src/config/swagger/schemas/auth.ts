import { OpenAPIV3 } from 'openapi-types';

export const authSchemas: Record<string, OpenAPIV3.SchemaObject> = {
  LoginRequest: {
    type: 'object',
    required: ['identifier', 'password'],
    properties: {
      identifier: {
        type: 'string',
        description: 'Email Address or username',
        example: 'johndoe or jonhdoe@example.com',
      },
      password: {
        type: 'string',
        description: 'Password',
        example: 'john.DOE@01',
      },
    },
  },

  AccessToken: {
    type: 'string',
    format: 'jwt',
    description: 'JWT access token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkNjAyMzFhZC1mZDAyLTRmMWEtOTQzYi0xMjg0ZGNlMWU5MDYiLCJlbWFpbCI6ImpvaG5AY29tcGFueS5jb20iLCJ1c2VybmFtZSI6ImpvaG4iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3NjQ5NDc4MzIsImV4cCI6MTc2NTEyNzgzMn0.aJ7Evx9sFqeU561a7m4NIQ78NGVj2j-K15YQm9xaX0U',
  },

  AuthResponse: {
    type: 'object',
    properties: {
      success: {
        type: 'boolean',
        default: true,
        readOnly: true,
      },
      data: {
        type: 'object',
        properties: {
          accessToken: {
            $ref: '#/components/schemas/AccessToken',
          },
          user: {
            $ref: '#/components/schemas/UserResponse',
          },
        },
      },
    },
  },

  RegisterRequest: {
    type: 'object',
    required: ['firstName', 'lastName', 'username', 'email', 'password'],
    properties: {
      firstName: {
        type: 'string',
        minimum: 2,
        maximum: 255,
        description: 'First name',
        example: 'John',
      },
      lastName: {
        type: 'string',
        minimum: 2,
        maximum: 255,
        description: 'Last name',
        example: 'Doe',
      },
      username: {
        type: 'string',
        minimum: 2,
        maximum: 20,
        description: 'Username',
        example: 'johndoe',
      },
      email: {
        type: 'string',
        minimum: 2,
        maximum: 255,
        description: 'Email Address',
        example: 'jonhdoe@example.com',
      },
      password: {
        type: 'string',
        minimum: 4,
        maximum: 6,
        description: 'Password',
      },
    },
  },
};
