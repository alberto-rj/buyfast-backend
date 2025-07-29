import z from 'zod';

import { refreshToken } from '.';

import { validate } from '../../utils';

const userLogout = z.object({
  cookies: z.object({
    refreshToken,
  }),
});

export type UserLogout = z.infer<typeof userLogout>;

export type UserLogoutInput = UserLogout['cookies'];

export const toUserLogout = (input: unknown) => {
  return validate<UserLogout>(userLogout, input);
};
