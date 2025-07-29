import * as dotenv from 'dotenv';

dotenv.config();

export {
  JWT_ACCESS_SECRET,
  JWT_ACCESS_SECRET_EXPIRES_IN_MINUTES,
  JWT_REFRESH_SECRET,
  JWT_REFRESH_SECRET_EXPIRES_IN_DAYS,
  BCRYPT_SALT_ROUNDS,
} from './auth';
export { CLIENT_BASE_URL } from './client';
export { DATABASE_URL } from './database';
export { prisma } from './prisma';
export {
  PORT,
  isDevelopmentEnv,
  isProductionEnv,
  isTestEnv,
  NODE_ENV,
} from './server';

export { setupCors } from './cors';
export { setupRoutes } from './routes';
