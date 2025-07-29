import z from 'zod';

import { firstName, lastName, username, email, password } from '.';
import { validate } from '../../utils';

const userCreate = z.object({
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
