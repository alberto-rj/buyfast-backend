import { Express } from 'express';
import { OpenAPIV3 } from 'openapi-types';
import swaggerUi from 'swagger-ui-express';

import { commonSchemas } from './schemas/common';
import { orderSchemas } from './schemas/order';
import { orderPaths } from './paths/orders';

export const swaggerDocument: OpenAPIV3.Document = {
  openapi: '3.0.0',
  info: {
    title: 'BuyFast API',
    version: '1.0.0',
    description:
      'API REST completa para e-commerce com Node.js, TypeScript, Express.js e PostgreSQL',
    contact: {
      name: 'Alberto José',
      url: 'https://github.com/alberto-rj',
      email: 'alberto@example.com',
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Servidor de Desenvolvimento',
    },
    {
      url: 'https://api.buyfast.com/api',
      description: 'Servidor de Produção',
    },
  ],
  tags: [
    {
      name: 'Orders',
      description: 'Gerenciamento de pedidos',
    },
    {
      name: 'Orders - Admin',
      description: 'Gerenciamento de pedidos (Administrador)',
    },
    {
      name: 'Cart',
      description: 'Carrinho de compras',
    },
    {
      name: 'Products',
      description: 'Gerenciamento de produtos',
    },
    {
      name: 'Categories',
      description: 'Gerenciamento de categorias',
    },
    {
      name: 'Auth',
      description: 'Autenticação e autorização',
    },
    {
      name: 'Users',
      description: 'Gerenciamento de usuários',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Autenticação JWT. Formato: `Bearer {token}`',
      },
    },
    schemas: {
      ...commonSchemas,
      ...orderSchemas,
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  paths: {
    ...orderPaths,
  },
};

export const setupSwagger = (app: Express) => {
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
      customCss: '.swagger-ui .topbar { display: none }',
      customSiteTitle: 'BuyFast API Documentation',
    }),
  );

  app.get('/api-docs/', (req, res) => {
    res.redirect('/api-docs');
  });
};
