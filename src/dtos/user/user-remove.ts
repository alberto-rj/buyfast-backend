import z from 'zod';

import { id } from '.';
import { validate } from '../../utils';

const userRemove = z.object({
  params: z.object({
    id,
  }),
});

export type UserRemove = z.infer<typeof userRemove>;

export type UserRemoveInput = UserRemove['params'];

export const toUserRemove = (input: unknown) => {
  return validate<UserRemove>(userRemove, input);
};
