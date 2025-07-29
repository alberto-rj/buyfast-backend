import z from 'zod';

import {
  role,
  limit,
  page,
  search,
  sortBy,
  order,
  minCreatedAt,
  maxCreatedAt,
  minUpdatedAt,
  maxUpdatedAt,
  includeInactive,
} from '.';
import { validate } from '../../utils';

const userFindMany = z.object({
  query: z.object({
    search: search,
    role: role.optional(),
    minCreatedAt: minCreatedAt.optional(),
    maxCreatedAt: maxCreatedAt.optional(),
    minUpdatedAt: minUpdatedAt.optional(),
    maxUpdatedAt: maxUpdatedAt.optional(),
    includeInactive: includeInactive.optional(),
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
