import { z } from 'zod';

import { description, id, includeInactive, name } from '.';
import { toSlug, validate } from '../../utils';

export const categoryUpdate = z.object({
  params: z.object({
    id,
  }),
  query: z.object({
    includeInactive,
  }),
  body: z
    .object({
      name,
      description: description.optional(),
    })
    .transform(({ name, ...categoryProps }) => ({
      name,
      slug: toSlug(name),
      ...categoryProps,
    })),
});

export type CategoryUpdate = z.infer<typeof categoryUpdate>;

export type CategoryUpdateInput = CategoryUpdate['params'] &
  CategoryUpdate['query'] &
  CategoryUpdate['body'];

export const toCategoryUpdate = (input: unknown) => {
  return validate<CategoryUpdate>(categoryUpdate, input);
};
