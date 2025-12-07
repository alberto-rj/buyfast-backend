import { OpenAPIV3 } from 'openapi-types';
import { createCategoryPath } from './create-category';
import { deleteCategoryPath } from './delete-category';
import { getCategoriesPath } from './get-categories';
import { getCategoryPath } from './get-category';
import { updateCategoryPath } from './update-category';

export const categoryPaths: OpenAPIV3.PathsObject = {
  '/categories': {
    ...createCategoryPath,
    ...getCategoriesPath,
  },
  '/categories/{id}': {
    ...getCategoryPath,
    ...updateCategoryPath,
    ...deleteCategoryPath,
  },
};
