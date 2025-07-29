export const PORT = Number(process.env.PORT as string);
export const NODE_ENV = process.env.NODE_ENV as string;
export const isDevelopmentEnv = NODE_ENV == 'development';
export const isProductionEnv = NODE_ENV == 'production';
export const isTestEnv = NODE_ENV == 'test';
