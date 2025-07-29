import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { isDevelopmentEnv, PORT } from './config/env';
import { setupRoutes } from './routes';

const app = express();

app.use(cors());
app.use(express.json());

if (isDevelopmentEnv) {
  app.use(morgan('dev'));
}

setupRoutes(app);

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});
