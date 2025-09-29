export const PRODUCT_UPLOAD_PATH = process.env.PRODUCT_UPLOAD_PATH as string;

export const PRODUCT_MAX_FILE_SIZE = Number(
  process.env.PRODUCT_MAX_FILE_SIZE as string,
);

export const PRODUCT_MAX_FILE_COUNT = Number(
  process.env.PRODUCT_MAX_FILE_COUNT as string,
);

export const PRODUCT_ALLOWED_FILE_TYPES = (
  process.env.PRODUCT_ALLOWED_FILE_TYPES as string
).split(',');
