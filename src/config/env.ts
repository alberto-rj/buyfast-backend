import * as dotenv from 'dotenv';

dotenv.config();

// Server
export const PORT = Number(process.env.PORT as string);
export const NODE_ENV = process.env.NODE_ENV as string;
export const isDevelopmentEnv = NODE_ENV == 'development';
export const isProductionEnv = NODE_ENV == 'production';
export const isTestEnv = NODE_ENV == 'test';

// JWT
export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as string;
export const JWT_ACCESS_SECRET_EXPIRES_IN_MINUTES = process.env
  .JWT_ACCESS_SECRET_EXPIRES_IN_MINUTES as string;

export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;
export const JWT_REFRESH_SECRET_EXPIRES_IN_DAYS = process.env
  .JWT_REFRESH_SECRET_EXPIRES_IN_DAYS as string;

// BCRYPT SALT
export const BCRYPT_SALT_ROUNDS = Number(
  process.env.BCRYPT_SALT_ROUNDS as string,
);
