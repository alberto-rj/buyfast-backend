import { z } from 'zod';

import { id, includeInactive } from './category-base';
import { validate } from '../../utils';

export const categoryFind = z.object({
  params: z.object({
    id,
  }),
  query: z.object({
    includeInactive,
  }),
});

export type CategoryFind = z.infer<typeof categoryFind>;

export type CategoryFindInput = CategoryFind['params'] & CategoryFind['query'];

export const toCategoryFind = (input: unknown) => {
  return validate<CategoryFind>(categoryFind, input);
};
