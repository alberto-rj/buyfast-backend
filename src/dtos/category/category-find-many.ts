import { z } from 'zod';

import {
  includeInactive,
  limit,
  page,
  sortedBy,
  sortOrder,
  search,
  updatedAtMin,
  updatedAtMax,
  createdAtMin,
  createdAtMax,
} from '.';

import { validate } from '../../utils';

export const categoryFindMany = z.object({
  query: z.object({
    includeInactive,
    search,
    createdAtMin: createdAtMin.optional(),
    createdAtMax: createdAtMax.optional(),
    updatedAtMin: updatedAtMin.optional(),
    updatedAtMax: updatedAtMax.optional(),
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
