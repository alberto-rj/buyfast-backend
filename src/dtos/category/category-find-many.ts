import { z } from 'zod';

import {
  includeInactive,
  limit,
  page,
  sortedBy,
  sortOrder,
  search,
  minCreatedAt,
  maxCreatedAt,
  minUpdatedAt,
  maxUpdatedAt,
} from '.';

import { validate } from '../../utils';

export const categoryFindMany = z.object({
  query: z.object({
    includeInactive,
    search,
    minCreatedAt: minCreatedAt.optional(),
    maxCreatedAt: maxCreatedAt.optional(),
    minUpdatedAt: minUpdatedAt.optional(),
    maxUpdatedAt: maxUpdatedAt.optional(),
    page,
    limit,
    sortedBy,
    sortOrder,
  }),
});

export type CategoryFindMany = z.infer<typeof categoryFindMany>;

export type CategoryFindManyInput = CategoryFindMany['query'];

export const toCategoryFindMany = (input: unknown) => {
  return validate<CategoryFindMany>(categoryFindMany, input);
};
