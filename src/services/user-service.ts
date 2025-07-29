import { toUserOutput } from '../dtos/user-output';
import { prisma } from '../config/prisma';
import { UserCreateInput } from '../dtos/user-input';
import { ConflictError, NotFoundError } from '../utils/app-error';
import { hashPassword } from '../utils/password-crypt';

export const getAllUsers = async () => {
  const filteredUsers = await prisma.user.findMany();

  return filteredUsers.map((user) => toUserOutput(user));
};

export const getUserByEmail = async (email: string) => {
  const filteredUser = await prisma.user.findUnique({ where: { email } });

  if (!filteredUser) {
    throw new NotFoundError('User not found.');
  }

  return toUserOutput(filteredUser);
};

export const getUserByUsername = async (username: string) => {
  const filteredUser = await prisma.user.findUnique({ where: { username } });

  if (!filteredUser) {
    throw new NotFoundError('User not found.');
  }

  return toUserOutput(filteredUser);
};

export const getUserByIdentifier = async (identifier: string) => {
  const filteredUser = await prisma.user.findFirst({
    where: { OR: [{ username: identifier }, { email: identifier }] },
  });

  if (!filteredUser) {
    throw new NotFoundError('User not found.');
  }

  return toUserOutput(filteredUser);
};

export const createUser = async (input: UserCreateInput) => {
  const [filteredUserByEmail, filteredUserByUserName] = await Promise.all([
    prisma.user.findUnique({ where: { email: input.email } }),
    prisma.user.findUnique({ where: { username: input.username } }),
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

  const hashedPassword = await hashPassword(input.password);
  const createdUser = await prisma.user.create({
    data: { ...input, password: hashedPassword },
  });

  return toUserOutput(createdUser);
};
