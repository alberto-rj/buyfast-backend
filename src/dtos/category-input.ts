import { z } from 'zod';

import {
  description,
  isActive,
  id,
  includeInactive,
  limit,
  name,
  page,
  sortedBy,
  sortOrder,
  search,
  updatedAtMin,
  updatedAtMax,
  createdAtMin,
  createdAtMax,
} from './category-base';
import { toSlug, validate } from '../utils';

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
