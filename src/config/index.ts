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

export {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_FOLDER_NAME,
  cloudinary,
} from './cloudinary';

export {
  PRODUCT_ALLOWED_FILE_TYPES,
  PRODUCT_MAX_FILE_COUNT,
  PRODUCT_MAX_FILE_SIZE,
  PRODUCT_UPLOAD_PATH,
} from './upload';

export { setupCors } from './cors';
export { setupRoutes } from './routes';
