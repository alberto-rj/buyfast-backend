import { Order, OrderItem, OrderStatus } from '../../types';
import {
  AddressOutput,
  PaginationOutput,
  toPaginationOutput,
  UserBasicOutput,
} from '../../dtos';

export type OrderItemOutput = {
  id: string;
  productName: string;
  productSku: String;
  unitPrice: number;
  quantity: number;
  taxAmount: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
};

export type OrderOutput = {
  id: string;
  number: string;
  status: OrderStatus;
  subtotal: number;
  shippingAmount: number;
  totalTaxAmount: number;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  billingAddress?: AddressOutput;
  shippingAddress?: AddressOutput;
  items?: OrderItemOutput[];
  user?: UserBasicOutput;
};

export const toOrderItemOutput = ({
  unitPrice,
  taxAmount,
  totalPrice,
  createdAt,
  updatedAt,
  ...props
}: OrderItem): OrderItemOutput => {
  return {
    unitPrice: Number(unitPrice),
    taxAmount: Number(taxAmount),
    totalPrice: Number(totalPrice),
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
    ...props,
  };
};

export const toOrderOutput = ({
  subtotal,
  shippingAmount,
  totalTaxAmount,
  totalAmount,
  billingAddress,
  shippingAddress,
  createdAt,
  updatedAt,
  ...props
}: Order): OrderOutput => {
  return {
    subtotal: Number(subtotal),
    shippingAmount: Number(shippingAmount),
    totalTaxAmount: Number(totalTaxAmount),
    totalAmount: Number(totalAmount),
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
