export { Order, OrderStatus, OrderItem } from '@prisma/client';

export type Address = {
  street: string;
  complement?: string;
  neighborhood: String;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};
