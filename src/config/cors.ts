import { Express } from 'express';
import cors from 'cors';

import { CLIENT_BASE_URL } from './client';

export const setupCors = (app: Express) => {
  app.use(
    cors({
      origin: CLIENT_BASE_URL,
      credentials: true,
    }),
  );
};
