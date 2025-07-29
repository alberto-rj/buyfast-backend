import z from 'zod';

import { firstName, lastName, id } from '.';
import { validate } from '../../utils';

const userUpdate = z.object({
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
