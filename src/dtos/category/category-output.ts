import { Category } from '../../types';
import { PaginationOutput, toPaginationOutput } from '../common/common-output';

export type CategoryOutput = {
  id: string;
  name: string;
  description?: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
};

export const toCategoryOutput = ({
  description,
  createdAt,
  updatedAt,
  ...props
}: Category): CategoryOutput => {
  const output = {
    ...props,
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toDateString(),
  };

  if (description === null) {
    return output;
  }

  return { description, ...output };
};

export const toCategoryPaginationOutput = ({
  resources,
  total,
  limit,
  page,
}: {
  total: number;
  limit: number;
  page: number;
  resources: Category[];
}): PaginationOutput<CategoryOutput[]> =>
  toPaginationOutput({
    total,
    limit,
    page,
    resources: resources.map((resource) => toCategoryOutput(resource)),
  });
