import z from 'zod';

import {
  firstName,
  lastName,
  username,
  email,
  password,
  role,
  identifier,
  refreshToken,
} from './user-base';
import { validate } from '../utils/validate';

export const userCreate = z.object({
  body: z.object({
    firstName,
    lastName,
    username,
    email,
    password,
    role,
  }),
});

export const userLogin = z.object({
  body: z.object({
    identifier,
    password,
  }),
});

export const userLogout = z.object({
  cookies: z.object({
    refreshToken,
  }),
});

export const userRefresh = z.object({
  cookies: z.object({
    refreshToken,
  }),
});

export type UserLogin = z.infer<typeof userLogin>;

export type UserCreate = z.infer<typeof userCreate>;

export type UserRefresh = z.infer<typeof userRefresh>;

export type UserLogout = z.infer<typeof userLogout>;

export type UserLoginInput = UserLogin['body'];

export type UserCreateInput = UserCreate['body'];

export type UserRefreshInput = UserRefresh['cookies'];

export type UserLogoutInput = UserLogout['cookies'];

export const toUserLogin = (input: unknown) => {
  return validate<UserLogin>(userLogin, input);
};

export const toUserCreate = (input: unknown) => {
  return validate<UserCreate>(userCreate, input);
};

export const toUserRefresh = (input: unknown) => {
  return validate<UserRefresh>(userRefresh, input);
};

export const toUserLogout = (input: unknown) => {
  return validate<UserLogout>(userLogout, input);
};
