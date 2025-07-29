import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import './config/env';
import { isDevelopmentEnv, NODE_ENV, PORT } from './config/server';
import { setupCors } from './config/cors';
import { setupRoutes } from './routes';

const app = express();

setupCors(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (isDevelopmentEnv) {
  app.use(morgan('dev'));
}

setupRoutes(app);

app.listen(PORT, () => {
  console.log(
    `🚀 Server is running in "${NODE_ENV}" mode at http://localhost:${PORT}`,
  );
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});
