import { z } from 'zod';

import { description, name } from '.';
import { toSlug, validate } from '../../utils';

export const categoryCreate = z.object({
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

export type CategoryCreate = z.infer<typeof categoryCreate>;

export type CategoryCreateInput = CategoryCreate['body'];

export const toCategoryCreate = (input: unknown) => {
  return validate<CategoryCreate>(categoryCreate, input);
};
