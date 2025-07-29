import { User } from '../types';
import { PaginationOutput, toPaginationOutput } from './common-output';

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

export const toUserOutput = (user: User): UserOutput => {
  const { password, ...userWithoutPassword } = user;
  return {
    ...userWithoutPassword,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
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
