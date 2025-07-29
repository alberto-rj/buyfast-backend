import { z } from 'zod';

import { isActive, id, includeInactive } from './category-base';
import { toSlug, validate } from '../../utils';

export const categoryUpdateIsActive = z.object({
  params: z.object({
    id,
  }),
  query: z.object({
    includeInactive,
  }),
  body: z.object({
    isActive,
  }),
});

export type CategoryUpdateIsActive = z.infer<typeof categoryUpdateIsActive>;

export type CategoryUpdateIsActiveInput = CategoryUpdateIsActive['params'] &
  CategoryUpdateIsActive['query'] &
  CategoryUpdateIsActive['body'];

export const toCategoryUpdateIsActive = (input: unknown) => {
  return validate<CategoryUpdateIsActive>(categoryUpdateIsActive, input);
};
