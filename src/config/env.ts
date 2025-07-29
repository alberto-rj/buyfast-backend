import * as dotenv from 'dotenv';

dotenv.config();

// Server
export const PORT = Number(process.env.PORT as string);
export const NODE_ENV = process.env.NODE_ENV as string;

// JWT
export const JWT_SECRET = process.env.JWT_SECRET as string;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN as string;

export const isDevelopmentEnv = NODE_ENV == 'development';
export const isProductionEnv = NODE_ENV == 'production';
export const isTestEnv = NODE_ENV == 'test';
