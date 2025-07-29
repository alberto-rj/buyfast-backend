import { z } from 'zod';

import { id, includeInactive } from '.';
import { validate } from '../../utils';

export const categoryRemove = z.object({
  params: z.object({
    id,
  }),
  query: z.object({
    includeInactive,
  }),
});

export type CategoryRemove = z.infer<typeof categoryRemove>;

export type CategoryRemoveInput = CategoryRemove['params'] &
  CategoryRemove['query'];

export const toCategoryRemove = (input: unknown) => {
  return validate<CategoryRemove>(categoryRemove, input);
};
