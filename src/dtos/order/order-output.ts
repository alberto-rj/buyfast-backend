import { Order, OrderItem, OrderStatus } from '../../types';
import {
  PaginationOutput,
  toPaginationOutput,
  UserBasicOutput,
} from '../../dtos';

export type OrderAddressOutput = {
  street: string;
  city: string;
  phone: string;
  zipCode: string;
};

export interface OrderItemOutput {
  id: string;
  productName: string;
  productSku: String;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderOutput {
  id: string;
  number: string;
  status: OrderStatus;
  totalAmount: number;
  deliveryAddress: OrderAddressOutput;
  createdAt: string;
  updatedAt: string;
}

export interface OrderResultOutput extends OrderOutput {
  items: OrderItemOutput[];
}

export interface OrderDetailsOutput extends OrderOutput {
  items: OrderItemOutput[];
  user: UserBasicOutput;
}

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
    deliveryAddress: deliveryAddress as OrderAddressOutput,
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
