import z from 'zod';

import {
  role,
  limit,
  page,
  search,
  sortBy,
  order,
  createdAtMin,
  createdAtMax,
  updatedAtMin,
  updatedAtMax,
} from '.';
import { validate } from '../../utils';

const userFindMany = z.object({
  query: z.object({
    search: search,
    role: role.optional(),
    createdAtMin: createdAtMin.optional(),
    createdAtMax: createdAtMax.optional(),
    updatedAtMin: updatedAtMin.optional(),
    updatedAtMax: updatedAtMax.optional(),
    limit,
    page,
    sortBy,
    order,
  }),
});

export type UserFindMany = z.infer<typeof userFindMany>;

export type UserFindManyInput = UserFindMany['query'];

export const toUserFindMany = (input: unknown) => {
  return validate<UserFindMany>(userFindMany, input);
};
