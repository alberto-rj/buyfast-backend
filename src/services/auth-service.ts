import { userService } from './';
import { prisma } from '../config';
import { UserCreateInput, UserLoginInput } from '../dtos/user/user-input';
import { toUserOutput, UserOutput } from '../dtos/user/user-output';
import { AuthPayload, User, UserRole } from '../types';
import {
  NotFoundError,
  UnauthorizedError,
  verifyPassword,
  generateAccessToken,
  generateRefreshToken,
  refreshTokenExpiresAt,
} from '../utils';

const toAuthPayload = (user: UserOutput | User): AuthPayload => {
  return {
    userId: user.id,
    email: user.email,
    username: user.username,
    role: user.role as UserRole,
  };
};

const register = async (input: UserCreateInput) => {
  const createdUser = await userService.create(input);
  const payload = toAuthPayload(createdUser);
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: createdUser.id,
      expiriesAt: refreshTokenExpiresAt(),
    },
  });

  return {
    accessToken,
    refreshToken,
    user: createdUser,
  };
};

const login = async (input: UserLoginInput) => {
  const filteredUser = await prisma.user.findFirst({
    where: {
      OR: [{ email: input.identifier }, { username: input.identifier }],
    },
  });

  if (!filteredUser) {
    throw new NotFoundError('identifier or password do not match.');
  }

  const hasVerifiedPassword = await verifyPassword(
    input.password,
    filteredUser.password,
  );

  if (!hasVerifiedPassword) {
    throw new NotFoundError('identifier or password do not match.');
  }

  const payload = toAuthPayload(filteredUser);
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: filteredUser.id,
      expiriesAt: refreshTokenExpiresAt(),
    },
  });

  return {
    accessToken,
    refreshToken,
    user: toUserOutput(filteredUser),
  };
};

const refresh = async (refreshToken: string) => {
  const filteredToken = await prisma.refreshToken.findUnique({
    where: { token: refreshToken },
    include: { user: true },
  });

  if (!filteredToken || filteredToken.expiriesAt < new Date()) {
    throw new UnauthorizedError('Refresh token is invalid or expired.');
  }

  const accessToken = generateAccessToken(toAuthPayload(filteredToken.user));
  return {
    accessToken,
    user: toUserOutput(filteredToken.user),
  };
};

const logout = async (refreshToken: string) => {
  await prisma.refreshToken.delete({
    where: {
      token: refreshToken,
    },
  });
};

export default {
  refresh,
  register,
  login,
  logout,
};
