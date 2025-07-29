import { prisma } from '../../src/config/prisma';
import { UserCreateInput } from '../../src/dtos/user/user-input';
import { hashPassword } from '../../src/utils/password-crypt';

import usersData from './users.json';

const users = usersData as UserCreateInput[];

const createUser = async (user: UserCreateInput) => {
  const hashedPassword = await hashPassword(user.password);
  const data = { ...user, password: hashedPassword };

  await prisma.user.create({ data: { ...data } });
};

export const createUsers = () => {
  users.forEach(createUser);
};
