import { product } from '../middlewares';

export const cleanupOnError = () => {
  product.cleanupUploadDirectory();
};
