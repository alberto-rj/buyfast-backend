import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { isDevelopmentEnv, PORT } from './config/env';
import { routes } from './routes';

const app = express();

app.use(cors());
app.use(express.json());

if (isDevelopmentEnv) {
  app.use(morgan('dev'));
}
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
