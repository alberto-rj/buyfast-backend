export type PaginationOutput<T> = {
  meta: {
    total: number;
    limit: number;
    page: number;
    pages: number;
    hasPrev: boolean;
    hasNext: boolean;
  };
  resources: T;
};

export const toPaginationOutput = <T>({
  total,
  page,
  limit,
  resources,
}: {
  page: number;
  limit: number;
  total: number;
  resources: T;
}): PaginationOutput<T> => {
  return {
    meta: {
      total,
      limit,
      page,
      pages: limit == 0 ? 0 : Math.ceil(total / limit),
      hasPrev: page > 1,
      hasNext: total > limit * (page - 1),
    },
    resources,
  };
};
