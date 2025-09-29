import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import { isDevelopmentEnv, setupCors, setupRoutes } from './config';

const app = express();

setupCors(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (isDevelopmentEnv) {
  app.use(morgan('dev'));
}

setupRoutes(app);

export { app };
