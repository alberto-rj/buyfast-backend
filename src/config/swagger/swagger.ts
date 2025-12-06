import { Express } from 'express';
import { OpenAPIV3 } from 'openapi-types';
import swaggerUi from 'swagger-ui-express';

import { commonSchemas } from './schemas/common';
import { orderSchemas } from './schemas/order';
import { orderPaths } from './paths/orders';
import { cartSchemas } from './schemas/cart';
import { cartPaths } from './paths/cart';
import { authSchemas } from './schemas/auth';
import { authPath } from './paths/auth';
import { userSchemas } from './schemas/user';
import { categoryPaths } from './paths/categories';

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
      email: 'albertorauljose@gmail.com',
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
  },
  servers: [
    {
      url: 'https://api.buyfast.com/api',
      description: 'Production server',
    },
    {
      url: 'http://localhost:3000/api',
      description: 'Development server',
    },
  ],
  tags: [
    {
      name: 'Orders',
      description: 'Orders management',
    },
    {
      name: 'Orders - Admin',
      description: 'Orders management',
    },
    {
      name: 'Cart',
      description: 'Cart management',
    },
    {
      name: 'Products',
      description: 'Products management',
    },
    {
      name: 'Categories',
      description: 'Categories management',
    },
    {
      name: 'Auth',
      description: 'Authentication and authorization',
    },
    {
      name: 'Users',
      description: 'Users management',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'JWT Authentication. Format: `Bearer {token}`',
      },
    },
    schemas: {
      ...commonSchemas,
      ...orderSchemas,
      ...cartSchemas,
      ...authSchemas,
      ...userSchemas,
      ...cartSchemas,
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  paths: {
    ...orderPaths,
    ...cartPaths,
    ...authPath,
    ...categoryPaths,
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
