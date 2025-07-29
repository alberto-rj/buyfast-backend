import { prisma } from '../config/prisma';
import { toUserOutput, toUserPaginationOutput } from '../dtos/user-output';
import {
  UserCreateInput,
  UserFindInput,
  UserFindManyInput,
  UserRemoveInput,
  UserUpdateInput,
  UserUpdateRoleInput,
} from '../dtos/user-input';
import { ConflictError, NotFoundError } from '../utils/app-error';
import { hashPassword } from '../utils/password-crypt';

const findMany = async ({
  role,
  search,
  createdAtMin,
  createdAtMax,
  updatedAtMin,
  updatedAtMax,
  sortedBy,
  sortOrder,
  limit,
  page,
}: UserFindManyInput) => {
  const [total, filteredUsers] = await Promise.all([
    prisma.user.count(),
    prisma.user.findMany({
      where: {
        role,
        createdAt: { gte: createdAtMin, lte: createdAtMax },
        updatedAt: { gte: updatedAtMin, lte: updatedAtMax },
        OR: [
          { firstName: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { username: { contains: search, mode: 'insensitive' } },
        ],
      },
      orderBy: { [sortedBy]: sortOrder },
      take: limit,
      skip: limit * (page - 1),
    }),
  ]);

  return toUserPaginationOutput({
    total,
    limit,
    page,
    resources: filteredUsers,
  });
};

const findOneById = async (id: string) => {
  const filteredUser = await prisma.user.findUnique({ where: { id } });

  if (!filteredUser) {
    throw new NotFoundError('User not found.');
  }

  return toUserOutput(filteredUser);
};

const find = async ({ id }: UserFindInput) => {
  const filteredUser = await findOneById(id);
  return filteredUser;
};

const create = async ({
  firstName,
  lastName,
  email,
  username,
  password,
}: UserCreateInput) => {
  const [filteredUserByEmail, filteredUserByUserName] = await Promise.all([
    prisma.user.findUnique({ where: { email } }),
    prisma.user.findUnique({ where: { username } }),
  ]);

  if (filteredUserByEmail || filteredUserByUserName) {
    const details: { field: string; message: string }[] = [];

    if (filteredUserByEmail) {
      details.push({ field: 'email', message: 'Email already exists.' });
    }

    if (filteredUserByUserName) {
      details.push({ field: 'username', message: 'Username already exists.' });
    }

    throw new ConflictError(details);
  }

  const hashedPassword = await hashPassword(password);
  const createdUser = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
    },
  });

  return toUserOutput(createdUser);
};

const update = async ({ firstName, lastName, id }: UserUpdateInput) => {
  await findOneById(id);

  const updatedUser = await prisma.user.update({
    data: {
      firstName,
      lastName,
    },
    where: { id },
  });

  return toUserOutput(updatedUser);
};

const updateRole = async ({ role, id }: UserUpdateRoleInput) => {
  await findOneById(id);

  const updatedUser = await prisma.user.update({
    data: {
      role,
    },
    where: { id },
  });

  return toUserOutput(updatedUser);
};

const remove = async ({ id }: UserRemoveInput): Promise<void> => {
  await findOneById(id);
  await prisma.user.delete({ where: { id } });
};

export default {
  create,
  findMany,
  find,
  update,
  updateRole,
  remove,
};
