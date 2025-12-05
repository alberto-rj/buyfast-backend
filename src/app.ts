import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import {
  isDevelopmentEnv,
  setupCors,
  setupRoutes,
  setupSwagger,
} from './config';

const app = express();

setupCors(app);

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (isDevelopmentEnv) {
  app.use(morgan('dev'));
}

setupSwagger(app);
setupRoutes(app);

export { app };
