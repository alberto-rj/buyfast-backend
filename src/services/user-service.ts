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
import {
  ConflictError,
  NotFoundError,
  canIncludeInactive,
  getUserFindManyArgs,
  hashPassword,
} from '../utils';

const ensureCanFind = async ({
  id,
  includeInactive,
}: {
  id: string;
  includeInactive: boolean;
}) => {
  const foundUser = await prisma.user.findUnique({
    where: {
      id,
      isActive: canIncludeInactive(includeInactive),
    },
    select: {
      isActive: true,
    },
  });

  if (!foundUser) {
    throw new NotFoundError('User not found.');
  }
};

const ensureCanCreate = async ({
  email,
  username,
}: {
  email: string;
  username: string;
}) => {
  const [foundUserByEmail, foundUserByUsername] = await Promise.all([
    prisma.user.findUnique({
      where: { email },
      select: { isActive: true },
    }),
    prisma.user.findUnique({
      where: { username },
      select: { isActive: true },
    }),
  ]);

  if (foundUserByEmail || foundUserByUsername) {
    const details: { field: string; message: string }[] = [];

    if (foundUserByEmail) {
      details.push({ field: 'email', message: 'Email already exists.' });
    }

    if (foundUserByUsername) {
      details.push({ field: 'username', message: 'Username already exists.' });
    }

    throw new ConflictError(details);
  }
};

const findMany = async ({
  includeInactive,
  limit,
  page,
  ...props
}: UserFindManyInput) => {
  const [total, foundUsers] = await Promise.all([
    prisma.user.count({
      where: {
        isActive: includeInactive,
      },
    }),
    prisma.user.findMany(
      getUserFindManyArgs({
        includeInactive,
        limit,
        page,
        ...props,
      }) as { [x: string]: never },
    ),
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
  await ensureCanCreate({ email, username });

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
  await ensureCanFind({ id, includeInactive: false });

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
  await ensureCanFind({ id, includeInactive: true });

  const updatedUser = await prisma.user.update({
    data: {
      role,
    },
    where: { id },
  });

  return toUserOutput(updatedUser);
};

const remove = async ({ id }: UserRemoveInput): Promise<void> => {
  await ensureCanFind({ id, includeInactive: true });
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
