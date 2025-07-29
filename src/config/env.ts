import * as dotenv from 'dotenv';

dotenv.config();

// Database
export const DATABASE_URL = process.env.DATABASE_URL as string;

// Frontend
export const CLIENT_BASE_URL = process.env.CLIENT_BASE_URL as string;

// Server
export const PORT = Number(process.env.PORT as string);
export const NODE_ENV = process.env.NODE_ENV as string;
export const isDevelopmentEnv = NODE_ENV == 'development';
export const isProductionEnv = NODE_ENV == 'production';
export const isTestEnv = NODE_ENV == 'test';

// JWT
export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as string;
export const JWT_ACCESS_SECRET_EXPIRES_IN_MINUTES = Number(
  process.env.JWT_ACCESS_SECRET_EXPIRES_IN_MINUTES as string,
);

export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;
export const JWT_REFRESH_SECRET_EXPIRES_IN_DAYS = Number(
  process.env.JWT_REFRESH_SECRET_EXPIRES_IN_DAYS as string,
);

// BCRYPT SALT
export const BCRYPT_SALT_ROUNDS = Number(
  process.env.BCRYPT_SALT_ROUNDS as string,
);
