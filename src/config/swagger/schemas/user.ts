import { OpenAPIV3 } from 'openapi-types';

export const userSchemas: Record<string, OpenAPIV3.SchemaObject> = {
  UserResponse: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
      },
      firstName: {
        type: 'string',
      },
      lastName: {
        type: 'string',
      },
      role: {
        type: 'string',
        enum: ['Customer', 'Admin'],
        default: 'Customer',
        description: 'User role',
      },
      email: {
        type: 'string',
      },
      username: {
        type: 'string',
      },
    },
  },

  UserBasicResponse: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
      },
      firstName: {
        type: 'string',
      },
      lastName: {
        type: 'string',
      },
      email: {
        type: 'string',
      },
    },
  },
};
