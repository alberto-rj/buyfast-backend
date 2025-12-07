import { OpenAPIV3 } from 'openapi-types';

export const getProductsPath: OpenAPIV3.PathItemObject = {
  get: {
    tags: ['Products'],
    summary: 'List products',
    description: 'Returns a paginated list of product products.',
    operationId: 'getProducts',
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        in: 'query',
        name: 'includeInactive',
        required: false,
        description: 'Include inactive products',
        schema: {
          type: 'boolean',
          default: false,
        },
      },
      {
        in: 'query',
        name: 'search',
        required: false,
        description: 'Search in name or description',
        schema: { type: 'string' },
      },
      {
        in: 'query',
        name: 'minCreatedAt',
        required: false,
        description: 'Filter by minimum creation date',
        schema: {
          type: 'string',
          format: 'date-time',
        },
      },
      {
        in: 'query',
        name: 'maxCreatedAt',
        required: false,
        description: 'Filter by maximum creation date',
        schema: {
          type: 'string',
          format: 'date-time',
        },
      },
      {
        in: 'query',
        name: 'minUpdatedAt',
        required: false,
        schema: {
          type: 'string',
          format: 'date-time',
          readOnly: false,
        },
      },
      {
        in: 'query',
        name: 'maxUpdatedAt',
        required: false,
        schema: {
          type: 'string',
          format: 'date-time',
          readOnly: false,
        },
      },
      {
        in: 'query',
        name: 'page',
        required: false,
        description: 'Current page number',
        schema: {
          type: 'integer',
          minimum: 1,
          default: 1,
          readOnly: false,
        },
      },
      {
        in: 'query',
        name: 'limit',
        required: false,
        description: 'Items per page',
        schema: {
          type: 'integer',
          readOnly: false,
          minimum: 1,
          maximum: 100,
          default: 10,
        },
      },
      {
        in: 'query',
        name: 'sortBy',
        required: false,
        description: 'Sorting field',
        schema: {
          type: 'string',
          enum: ['name', 'createdAt', 'updatedAt'],
          default: 'updatedAt',
        },
      },
      {
        in: 'query',
        name: 'order',
        required: false,
        description: 'Sorting order',
        schema: {
          type: 'string',
          readOnly: false,
          enum: ['asc', 'desc'],
          default: 'desc',
        },
      },
    ],
    responses: {
      '200': {
        description: 'Paginated list of products',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CategoryListResponse' },
          },
        },
      },
      '401': {
        description: 'Not authenticated',
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
