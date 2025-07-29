import z from 'zod';

import { id } from '.';
import { validate } from '../../utils';

const userFind = z.object({
  params: z.object({
    id,
  }),
});

export type UserFind = z.infer<typeof userFind>;

export type UserFindInput = UserFind['params'];

export const toUserFind = (input: unknown) => {
  return validate<UserFind>(userFind, input);
};
