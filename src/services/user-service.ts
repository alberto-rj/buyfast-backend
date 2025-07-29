import { prisma } from '../config';
import {
  UserCreateInput,
  UserFindInput,
  UserFindManyInput,
  UserRemoveInput,
  UserUpdateInput,
  UserUpdateRoleInput,
  toUserOutput,
  toUserPaginationOutput,
} from '../dtos';
import { ConflictError, NotFoundError, hashPassword } from '../utils';

const findMany = async ({
  role,
  search,
  minCreatedAt,
  maxCreatedAt,
  minUpdatedAt,
  maxUpdatedAt,
  sortBy,
  order,
  limit,
  page,
}: UserFindManyInput) => {
  const [total, foundUsers] = await Promise.all([
    prisma.user.count(),
    prisma.user.findMany({
      where: {
        role,
        createdAt: { gte: minCreatedAt, lte: maxCreatedAt },
        updatedAt: { gte: minUpdatedAt, lte: maxUpdatedAt },
        OR: [
          { firstName: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { username: { contains: search, mode: 'insensitive' } },
        ],
      },
      orderBy: { [sortBy]: order },
      take: limit,
      skip: limit * (page - 1),
    }),
  ]);

  return toUserPaginationOutput({
    total,
    limit,
    page,
    resources: foundUsers,
  });
};

const findOneById = async (id: string) => {
  const foundUser = await prisma.user.findUnique({ where: { id } });

  if (!foundUser) {
    throw new NotFoundError('User not found.');
  }

  return toUserOutput(foundUser);
};

const find = async ({ id }: UserFindInput) => {
  const foundUser = await findOneById(id);
  return foundUser;
};

const create = async ({
  firstName,
  lastName,
  email,
  username,
  password,
}: UserCreateInput) => {
  const [foundUserByEmail, foundUserByUserName] = await Promise.all([
    prisma.user.findUnique({
      where: { email },
      select: { id: true },
    }),
    prisma.user.findUnique({
      where: { username },
      select: { id: true },
    }),
  ]);

  if (foundUserByEmail || foundUserByUserName) {
    const details: { field: string; message: string }[] = [];

    if (foundUserByEmail) {
      details.push({ field: 'email', message: 'Email already exists.' });
    }

    if (foundUserByUserName) {
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

export const userService = {
  create,
  findMany,
  find,
  update,
  updateRole,
  remove,
};
