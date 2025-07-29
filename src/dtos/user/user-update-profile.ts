import z from 'zod';

import { firstName, lastName } from '.';
import { validate } from '../../utils';

const userUpdateProfile = z.object({
  body: z.object({
    firstName,
    lastName,
  }),
});

export type UserUpdateProfile = z.infer<typeof userUpdateProfile>;

export const toUserUpdateProfile = (input: unknown) => {
  return validate<UserUpdateProfile>(userUpdateProfile, input);
};
