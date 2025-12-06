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
      updatedAt: { type: 'string' }, // ou format: 'date-time' se ajustar no backend
    },
  },

  Pagination: {
    type: 'object',
    properties: {
      total: { type: 'integer' },
      length: { type: 'integer' },
      limit: { type: 'integer' },
      page: { type: 'integer' },
      pages: { type: 'integer' },
      hasPrev: { type: 'boolean' },
      hasNext: { type: 'boolean' },
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
            $ref: '#/components/schemas/Pagination',
          },
        },
      },
    },
  },
};
