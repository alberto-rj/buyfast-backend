import { OpenAPIV3 } from 'openapi-types';

export const cartSchemas: Record<string, OpenAPIV3.SchemaObject> = {
  CartItem: {
    type: 'object',
    properties: {
      id: { type: 'string', format: 'uuid' },
      productId: { type: 'string', format: 'uuid' },
      quantity: { type: 'integer', minimum: 1, example: 5 },
      product: { $ref: '#/components/schemas/Product' },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
    },
  },

  AddCartItemRequest: {
    type: 'object',
    required: ['productId', 'quantity'],
    properties: {
      productId: { type: 'string', format: 'uuid' },
      quantity: { type: 'integer', minimum: 1, example: 5 },
    },
  },

  UpdateCartItemRequest: {
    type: 'object',
    required: ['quantity'],
    properties: {
      quantity: { type: 'integer', minimum: 1, example: 10 },
    },
  },
};
