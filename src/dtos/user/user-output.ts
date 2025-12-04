import { User } from '../../types';
import { PaginationOutput, toPaginationOutput } from '../../dtos';

export type UserBasicOutput = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type UserOutput = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export const toUserBasicOutput = ({
  id,
  email,
  firstName,
  lastName,
}: {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}): UserBasicOutput => {
  return {
    id,
    email,
    firstName,
    lastName,
  };
};

export const toUserOutput = ({
  password,
  createdAt,
  updatedAt,
  ...props
}: User): UserOutput => {
  return {
    ...props,
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
  };
};

export const toUserPaginationOutput = ({
  total,
  limit,
  page,
  resources,
}: {
  total: number;
  limit: number;
  page: number;
  resources: User[];
}): PaginationOutput<UserOutput[]> => {
  return toPaginationOutput<UserOutput[]>({
    total,
    page,
    limit,
    resources: resources.map((user) => toUserOutput(user)),
  });
};
