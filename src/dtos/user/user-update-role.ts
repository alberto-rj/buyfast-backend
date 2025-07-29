import z from 'zod';

import { role, id } from '.';
import { validate } from '../../utils';

const userUpdateRole = z.object({
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
