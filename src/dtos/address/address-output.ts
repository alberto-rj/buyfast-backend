import { Address } from '../../types';

export type AddressOutput = {
  id: string;
  street: string;
  complement: string | null;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
};

export const toAddressOutput = ({
  createdAt,
  updatedAt,
  ...props
}: Address): AddressOutput => {
  return {
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
    ...props,
  };
};

export const parseJSON = (address: unknown): AddressOutput => {
  return address as AddressOutput;
};
