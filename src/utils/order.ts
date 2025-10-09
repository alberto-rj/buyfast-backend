import { prisma } from '../config';

export const generateOrderNumber = async () => {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');

  const count = await prisma.order.count();

  const sequence = (count + 1).toString().padStart(6, '0');

  return `ORD-${date}-${sequence}`;
};
