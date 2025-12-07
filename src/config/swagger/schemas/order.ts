import { OpenAPIV3 } from 'openapi-types';

export const orderSchemas: Record<string, OpenAPIV3.SchemaObject> = {
  OrderAddress: {
    type: 'object',
    required: ['phone', 'street', 'city', 'zipCode'],
    properties: {
      phone: {
        type: 'string',
        minLength: 9,
        example: '923456789',
        description: 'Contact phone number',
      },
      street: {
        type: 'string',
        minLength: 5,
        example: 'Independence Street, 123',
        description: 'Full street address',
      },
      city: {
        type: 'string',
        minLength: 2,
        example: 'Luanda',
        description: 'City',
      },
      zipCode: {
        type: 'string',
        minLength: 5,
        example: '12345',
        description: 'Zip code',
      },
    },
  },

  CreateOrderRequest: {
    type: 'object',
    required: ['deliveryAddress'],
    properties: {
      deliveryAddress: {
        $ref: '#/components/schemas/OrderAddress',
      },
    },
  },

  UpdateOrderStatusRequest: {
    type: 'object',
    required: ['status'],
    properties: {
      status: {
        type: 'string',
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        description: 'New status for the order',
      },
    },
  },

  OrderItemResponse: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
        example: 'a3588106-6b33-4378-8e35-ee82cbfb52ee',
      },
      productId: {
        type: 'string',
        format: 'uuid',
      },
      productName: {
        type: 'string',
        example: 'Gaming Keyboard',
        description: 'Product name at the time of purchase',
      },
      productSku: {
        type: 'string',
        example: 'GK-018',
        description: 'Product SKU',
      },
      quantity: {
        type: 'integer',
        minimum: 1,
        example: 10,
        description: 'Quantity of the product in the order',
      },
      unitPrice: {
        type: 'number',
        format: 'decimal',
        example: 69.99,
        description: 'Unit price of the product',
      },
      totalPrice: {
        type: 'number',
        format: 'decimal',
        example: 699.9,
        description: 'Total price (quantity × unit price)',
      },
      createdAt: {
        type: 'string',
        format: 'date-time',
      },
      updatedAt: {
        type: 'string',
        format: 'date-time',
      },
    },
  },

  OrderResponse: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
        example: 'e5d06deb-3ecc-402d-8f67-172f362dbf46',
      },
      userId: {
        type: 'string',
        format: 'uuid',
      },
      number: {
        type: 'string',
        example: 'ORD-20251205-0001',
        description: 'Unique order number',
      },
      status: {
        type: 'string',
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        example: 'Pending',
        description: 'Current status of the order',
      },
      totalAmount: {
        type: 'number',
        format: 'decimal',
        example: 901.15,
        description: 'Total value of the order',
      },
      deliveryAddress: {
        $ref: '#/components/schemas/OrderAddress',
      },
      items: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/OrderItemResponse',
        },
        description: 'List of items included in the order',
      },
      createdAt: {
        type: 'string',
        format: 'date-time',
        example: '2025-12-05T15:24:45.783Z',
      },
      updatedAt: {
        type: 'string',
        format: 'date-time',
        example: '2025-12-05T15:34:31.003Z',
      },
    },
  },

  OrderDetailedResponse: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
        example: 'e5d06deb-3ecc-402d-8f67-172f362dbf46',
      },
      userId: {
        type: 'string',
        format: 'uuid',
      },
      number: {
        type: 'string',
        example: 'ORD-20251205-0001',
        description: 'Unique order number',
      },
      status: {
        type: 'string',
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        example: 'Pending',
        description: 'Current status of the order',
      },
      totalAmount: {
        type: 'number',
        format: 'decimal',
        example: 901.15,
        description: 'Total value of the order',
      },
      deliveryAddress: {
        $ref: '#/components/schemas/OrderAddress',
      },
      items: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/OrderItemResponse',
        },
        description: 'List of items included in the order',
      },
      user: {
        $ref: '#/components/schemas/UserBasicResponse',
      },
      createdAt: {
        type: 'string',
        format: 'date-time',
        example: '2025-12-05T15:24:45.783Z',
      },
      updatedAt: {
        type: 'string',
        format: 'date-time',
        example: '2025-12-05T15:34:31.003Z',
      },
    },
  },
};
