import { User } from '../types/user';

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
  return {
    ...user,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
};
