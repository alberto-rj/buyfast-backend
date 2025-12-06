import { createCategoryPath } from './create-category';
import { deleteCategoryPath } from './delete-category';
import { getCategoriesPath } from './get-categories';
import { getCategoryPath } from './get-category';
import { updateCategoryPath } from './update-category';

export const categoryPaths = {
  ...createCategoryPath,
  ...getCategoriesPath,
  ...getCategoryPath,
  ...updateCategoryPath,
};
