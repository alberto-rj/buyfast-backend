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
  id,
  limit,
  page,
  search,
  sortedBy,
  sortOrder,
  createdAtMin,
  createdAtMax,
  updatedAtMin,
  updatedAtMax,
} from './user-base';
import { validate } from '../../utils/validate';

export const userCreate = z.object({
  body: z.object({
    firstName,
    lastName,
    username,
    email,
    password,
  }),
});
export type UserCreate = z.infer<typeof userCreate>;
export type UserCreateInput = UserCreate['body'];
export const toUserCreate = (input: unknown) => {
  return validate<UserCreate>(userCreate, input);
};

export const userUpdate = z.object({
  params: z.object({ id }),
  body: z.object({
    firstName,
    lastName,
  }),
});
export type UserUpdate = z.infer<typeof userUpdate>;
export type UserUpdateInput = UserUpdate['body'] & UserUpdate['params'];
export const toUserUpdate = (input: unknown) => {
  return validate<UserUpdate>(userUpdate, input);
};

export const userUpdateProfile = z.object({
  body: z.object({
    firstName,
    lastName,
  }),
});
export type UserUpdateProfile = z.infer<typeof userUpdateProfile>;
export const toUserUpdateProfile = (input: unknown) => {
  return validate<UserUpdateProfile>(userUpdateProfile, input);
};

export const userUpdateRole = z.object({
  params: z.object({
    id,
  }),
  body: z.object({
    role,
  }),
});
export type UserUpdateRole = z.infer<typeof userUpdateRole>;
export type UserUpdateRoleInput = UserUpdateRole['body'] & { id: string };
export const toUserUpdateRole = (input: unknown) => {
  return validate<UserUpdateRole>(userUpdateRole, input);
};

export const userFind = z.object({
  params: z.object({
    id,
  }),
});
export type UserFind = z.infer<typeof userFind>;
export type UserFindInput = UserFind['params'];
export const toUserFind = (input: unknown) => {
  return validate<UserFind>(userFind, input);
};

export const userFindMany = z.object({
  query: z.object({
    search: search,
    role: role.optional(),
    createdAtMin: createdAtMin.optional(),
    createdAtMax: createdAtMax.optional(),
    updatedAtMin: updatedAtMin.optional(),
    updatedAtMax: updatedAtMax.optional(),
    limit,
    page,
    sortedBy: sortedBy,
    sortOrder: sortOrder,
  }),
});
export type UserFindMany = z.infer<typeof userFindMany>;
export type UserFindManyInput = UserFindMany['query'];
export const toUserFindMany = (input: unknown) => {
  return validate<UserFindMany>(userFindMany, input);
};

export const userRemove = z.object({
  params: z.object({
    id,
  }),
});
export type UserRemove = z.infer<typeof userRemove>;
export type UserRemoveInput = UserRemove['params'];
export const toUserRemove = (input: unknown) => {
  return validate<UserRemove>(userRemove, input);
};

export const userLogin = z.object({
  body: z.object({
    identifier,
    password,
  }),
});
export type UserLogin = z.infer<typeof userLogin>;
export type UserLoginInput = UserLogin['body'];
export const toUserLogin = (input: unknown) => {
  return validate<UserLogin>(userLogin, input);
};

export const userLogout = z.object({
  cookies: z.object({
    refreshToken,
  }),
});
export type UserLogout = z.infer<typeof userLogout>;
export type UserLogoutInput = UserLogout['cookies'];
export const toUserLogout = (input: unknown) => {
  return validate<UserLogout>(userLogout, input);
};

export const userRefresh = z.object({
  cookies: z.object({
    refreshToken,
  }),
});
export type UserRefresh = z.infer<typeof userRefresh>;
export type UserRefreshInput = UserRefresh['cookies'];
export const toUserRefresh = (input: unknown) => {
  return validate<UserRefresh>(userRefresh, input);
};
