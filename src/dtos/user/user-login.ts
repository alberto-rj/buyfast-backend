import z from 'zod';

import { password, identifier } from '.';
import { validate } from '../../utils';

const userLogin = z.object({
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
