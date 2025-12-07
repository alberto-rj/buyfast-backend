import { OpenAPIV3 } from 'openapi-types';

export const commonSchemas: Record<string, OpenAPIV3.SchemaObject> = {
  SuccessResponse: {
    type: 'object',
    properties: {
      success: {
        type: 'boolean',
        example: true,
      },
      data: {
        type: 'object',
      },
    },
  },

  ErrorDetailedResponse: {
    type: 'object',
    properties: {
      success: { type: 'boolean', example: false },
      data: {
        type: 'object',
        properties: {
          error: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              message: { type: 'string' },
              details: { type: 'array', items: { type: 'object' } },
            },
          },
        },
      },
    },
  },

  ErrorResponse: {
    type: 'object',
    properties: {
      success: { type: 'boolean', example: false },
      data: {
        type: 'object',
        properties: {
          error: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
              message: {
                type: 'string',
              },
            },
          },
        },
      },
    },
  },

  PaginationResponse: {
    type: 'object',
    properties: {
      page: {
        type: 'integer',
        example: 1,
      },
      limit: {
        type: 'integer',
        example: 10,
      },
      total: {
        type: 'integer',
        example: 100,
      },
      pages: {
        type: 'integer',
        example: 10,
      },
      hasPrev: {
        type: 'boolean',
        example: false,
      },
      hasNext: {
        type: 'boolean',
        example: true,
      },
    },
  },

  PaginatedResponse: {
    type: 'object',
    properties: {
      success: {
        type: 'boolean',
        example: true,
      },
      data: {
        type: 'object',
        properties: {
          results: {
            type: 'array',
            items: {},
          },
          pagination: {
            $ref: '#/components/schemas/Pagination',
          },
        },
      },
    },
  },
};
