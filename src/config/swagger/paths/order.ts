import { OpenAPIV3 } from 'openapi-types';

export const orderPaths: OpenAPIV3.PathsObject = {
  '/orders': {
    post: {
      tags: ['Orders'],
      summary: 'Criar um novo pedido',
      description:
        'Cria um pedido a partir dos itens no carrinho do usuário autenticado. O carrinho é limpo após a criação do pedido.',
      operationId: 'createOrder',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/CreateOrderRequest',
            },
            example: {
              deliveryAddress: {
                fullName: 'João Silva',
                phone: '923456789',
                street: 'Rua da Independência, 123',
                neighborhood: 'Maianga',
                city: 'Luanda',
                state: 'Luanda',
                zipCode: '12345',
                country: 'Angola',
              },
            },
          },
        },
      },
      responses: {
        '201': {
          description: 'Pedido criado com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  data: { $ref: '#/components/schemas/Order' },
                },
              },
            },
          },
        },
        '400': {
          description: 'Carrinho vazio, produto sem estoque ou dados inválidos',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' },
              examples: {
                carrinhoVazio: {
                  summary: 'Carrinho vazio',
                  value: {
                    success: false,
                    data: {
                      error: {
                        name: 'Bad Request Error',
                        message: 'Seu carrinho está vazio',
                      },
                    },
                  },
                },
                semEstoque: {
                  summary: 'Produto sem estoque',
                  value: {
                    success: false,
                    data: {
                      error: {
                        name: 'Bad Request Error',
                        message:
                          'Estoque insuficiente para "Gaming Keyboard". Disponível: 5, Solicitado: 10',
                      },
                    },
                  },
                },
              },
            },
          },
        },
        '401': {
          description: 'Não autenticado',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' },
            },
          },
        },
      },
    },

    get: {
      tags: ['Orders'],
      summary: 'Listar pedidos do usuário',
      description:
        'Retorna uma lista paginada dos pedidos do usuário autenticado',
      operationId: 'getUserOrders',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'query',
          name: 'page',
          schema: {
            type: 'integer',
            default: 1,
            minimum: 1,
          },
          description: 'Número da página',
        },
        {
          in: 'query',
          name: 'limit',
          schema: {
            type: 'integer',
            default: 10,
            minimum: 1,
            maximum: 100,
          },
          description: 'Quantidade de itens por página',
        },
        {
          in: 'query',
          name: 'status',
          schema: {
            type: 'string',
            enum: [
              'Pending',
              'Processing',
              'Shipped',
              'Delivered',
              'Cancelled',
            ],
          },
          description: 'Filtrar por status do pedido',
        },
      ],
      responses: {
        '200': {
          description: 'Lista de pedidos',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  data: {
                    type: 'object',
                    properties: {
                      results: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/Order' },
                      },
                      pagination: { $ref: '#/components/schemas/Pagination' },
                    },
                  },
                },
              },
            },
          },
        },
        '401': {
          description: 'Não autenticado',
        },
      },
    },
  },

  '/orders/{id}': {
    get: {
      tags: ['Orders'],
      summary: 'Obter detalhes de um pedido',
      description:
        'Retorna os detalhes completos de um pedido específico. Usuários só podem ver seus próprios pedidos.',
      operationId: 'getOrderById',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'string',
            format: 'uuid',
          },
          description: 'ID do pedido',
        },
      ],
      responses: {
        '200': {
          description: 'Detalhes do pedido',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  data: {
                    type: 'object',
                    properties: {
                      results: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/Order' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        '401': {
          description: 'Não autenticado',
        },
        '403': {
          description: 'Sem permissão para ver este pedido',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' },
            },
          },
        },
        '404': {
          description: 'Pedido não encontrado',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' },
            },
          },
        },
      },
    },
  },

  '/admin/orders': {
    get: {
      tags: ['Orders - Admin'],
      summary: 'Listar todos os pedidos (Admin)',
      description:
        'Retorna uma lista paginada de todos os pedidos do sistema. Requer permissão de administrador.',
      operationId: 'getAllOrders',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'query',
          name: 'page',
          schema: {
            type: 'integer',
            default: 1,
            minimum: 1,
          },
        },
        {
          in: 'query',
          name: 'limit',
          schema: {
            type: 'integer',
            default: 10,
            minimum: 1,
            maximum: 100,
          },
        },
        {
          in: 'query',
          name: 'status',
          schema: {
            type: 'string',
            enum: [
              'Pending',
              'Processing',
              'Shipped',
              'Delivered',
              'Cancelled',
            ],
          },
        },
      ],
      responses: {
        '200': {
          description: 'Lista de todos os pedidos',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  data: {
                    type: 'object',
                    properties: {
                      results: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/Order' },
                      },
                      pagination: { $ref: '#/components/schemas/Pagination' },
                    },
                  },
                },
              },
            },
          },
        },
        '401': {
          description: 'Não autenticado',
        },
        '403': {
          description: 'Sem permissão de administrador',
        },
      },
    },
  },

  '/admin/orders/{id}/status': {
    patch: {
      tags: ['Orders - Admin'],
      summary: 'Atualizar status do pedido (Admin)',
      description: `Atualiza o status de um pedido. Apenas transições válidas são permitidas:

- Pending → Processing, Cancelled
- Processing → Shipped, Cancelled
- Shipped → Delivered
- Delivered → (status final)
- Cancelled → (status final)`,
      operationId: 'updateOrderStatus',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'string',
            format: 'uuid',
          },
          description: 'ID do pedido',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UpdateOrderStatusRequest',
            },
            example: {
              status: 'Processing',
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Status atualizado com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  data: { $ref: '#/components/schemas/Order' },
                },
              },
            },
          },
        },
        '400': {
          description: 'Transição de status inválida',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' },
              example: {
                success: false,
                data: {
                  error: {
                    name: 'Conflict Error',
                    message: 'Conflict error.',
                    details: [
                      {
                        field: 'status',
                        message:
                          'Cannot change status from Delivered to Processing.',
                      },
                    ],
                  },
                },
              },
            },
          },
        },
        '401': {
          description: 'Não autenticado',
        },
        '403': {
          description: 'Sem permissão de administrador',
        },
        '404': {
          description: 'Order not found',
        },
      },
    },
  },
};
