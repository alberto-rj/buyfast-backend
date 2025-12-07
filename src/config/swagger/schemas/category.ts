import { OpenAPIV3 } from 'openapi-types';

export const categorySchemas: Record<string, OpenAPIV3.SchemaObject> = {
  Category: {
    type: 'object',
    properties: {
      id: { type: 'string', format: 'uuid' },
      name: { type: 'string' },
      slug: { type: 'string' },
      description: { type: 'string', nullable: true },
      isActive: { type: 'boolean' },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
    },
  },

  CreateCategoryRequest: {
    type: 'object',
    required: ['name'],
    properties: {
      name: { type: 'string' },
      description: { type: 'string' },
    },
  },

  UpdateCategoryRequest: {
    type: 'object',
    required: ['name'],
    properties: {
      name: { type: 'string' },
      description: { type: 'string' },
    },
  },

  CategoryResponse: {
    type: 'object',
    properties: {
      success: { type: 'boolean', default: true },
      data: {
        type: 'object',
        properties: {
          results: {
            type: 'array',
            items: { $ref: '#/components/schemas/Category' },
          },
        },
      },
    },
  },

  CategoryListResponse: {
    type: 'object',
    properties: {
      success: { type: 'boolean', default: true },
      data: {
        type: 'object',
        properties: {
          results: {
            type: 'array',
            items: { $ref: '#/components/schemas/Category' },
          },
          pagination: {
            $ref: '#/components/schemas/PaginationResponse',
          },
        },
      },
    },
  },
};
