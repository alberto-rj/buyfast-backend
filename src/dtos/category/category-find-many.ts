import { z } from 'zod';

import {
  includeInactive,
  limit,
  page,
  sortBy,
  order,
  search,
  minCreatedAt,
  maxCreatedAt,
  minUpdatedAt,
  maxUpdatedAt,
} from '.';

import { validate } from '../../utils';

const categoryFindMany = z.object({
  query: z.object({
    search: search.optional(),
    minCreatedAt: minCreatedAt.optional(),
    maxCreatedAt: maxCreatedAt.optional(),
    minUpdatedAt: minUpdatedAt.optional(),
    maxUpdatedAt: maxUpdatedAt.optional(),
    includeInactive: includeInactive.optional(),
    page,
    limit,
    sortBy,
    order,
  }),
});

export type CategoryFindMany = z.infer<typeof categoryFindMany>;

export type CategoryFindManyInput = CategoryFindMany['query'];

export const toCategoryFindMany = (input: unknown) => {
  return validate<CategoryFindMany>(categoryFindMany, input);
};
