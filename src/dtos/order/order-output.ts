import { Order, OrderItem, OrderStatus } from '../../types';
import {
  PaginationOutput,
  toPaginationOutput,
  UserBasicOutput,
} from '../../dtos';

export type AddressOutput = {
  street: string;
  city: string;
  phone: string;
  zipCode: string;
};

export type OrderItemOutput = {
  id: string;
  productName: string;
  productSku: String;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
};

export type OrderOutput = {
  id: string;
  number: string;
  status: OrderStatus;
  totalAmount: number;
  deliveryAddress: AddressOutput;
  createdAt: string;
  updatedAt: string;
};

export type OrderDetailsOutput = {
  id: string;
  number: string;
  status: OrderStatus;
  totalAmount: number;
  deliveryAddress: AddressOutput;
  items: OrderItemOutput[];
  user: UserBasicOutput;
  createdAt: string;
  updatedAt: string;
};

export const toOrderItemOutput = ({
  unitPrice,
  totalPrice,
  createdAt,
  updatedAt,
  ...props
}: OrderItem): OrderItemOutput => {
  return {
    unitPrice: Number(unitPrice),
    totalPrice: Number(totalPrice),
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
    ...props,
  };
};

export const toOrderOutput = ({
  totalAmount,
  deliveryAddress,
  createdAt,
  updatedAt,
  ...props
}: Order): OrderOutput => {
  return {
    totalAmount: Number(totalAmount),
    deliveryAddress: deliveryAddress as AddressOutput,
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
    ...props,
  };
};

export const toOrderPaginationOutput = ({
  resources,
  total,
  limit,
  page,
}: {
  total: number;
  limit: number;
  page: number;
  resources: Order[];
}): PaginationOutput<OrderOutput[]> =>
  toPaginationOutput({
    total,
    limit,
    page,
    resources: resources.map((resource) => toOrderOutput(resource)),
  });
