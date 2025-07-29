import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import {
  CLIENT_BASE_URL,
  isDevelopmentEnv,
  NODE_ENV,
  PORT,
} from './config/env';
import { setupRoutes } from './routes';

const app = express();

app.use(cors({ origin: CLIENT_BASE_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (isDevelopmentEnv) {
  app.use(morgan('dev'));
}

setupRoutes(app);

app.listen(PORT, () => {
  console.log(
    `🚀 Server is running at http://localhost:${PORT} in ${NODE_ENV} mode`,
  );
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});
