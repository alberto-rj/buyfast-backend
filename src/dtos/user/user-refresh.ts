import z from 'zod';

import { refreshToken } from '.';
import { validate } from '../../utils';

const userRefresh = z.object({
  cookies: z.object({
    refreshToken,
  }),
});

export type UserRefresh = z.infer<typeof userRefresh>;

export type UserRefreshInput = UserRefresh['cookies'];

export const toUserRefresh = (input: unknown) => {
  return validate<UserRefresh>(userRefresh, input);
};
