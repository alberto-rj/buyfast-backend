import { prisma } from '../../../src/config';
import { UserCreateInput } from '../../../src/dtos';
import { hashPassword } from '../../../src/utils';

import userEntries from '../data/users.json';

const users = userEntries as UserCreateInput[];

const createUser = async (input: UserCreateInput) => {
  const hashedPassword = await hashPassword(input.password);
  const data = { ...input, password: hashedPassword };

  await prisma.user.create({ data });
};

const deleteAllUsers = async () => {
  await prisma.user.deleteMany();
};

export const createUsers = async () => {
  await deleteAllUsers();

  for (const user of users) {
    await createUser(user);
  }
};
