export type PaginationOutput<T extends { length: number }> = {
  pagination: {
    total: number;
    length: number;
    limit: number;
    page: number;
    pages: number;
    hasPrev: boolean;
    hasNext: boolean;
  };
  resources: T;
};

export const toPaginationOutput = <T extends { length: number }>({
  total,
  page,
  limit,
  resources,
}: {
  total: number;
  page: number;
  limit: number;
  resources: T;
}): PaginationOutput<T> => {
  return {
    pagination: {
      total,
      length: resources.length,
      limit,
      page,
      pages: limit == 0 ? 0 : Math.ceil(total / limit),
      hasPrev: page > 1,
      hasNext: total > limit * (page - 1),
    },
    resources,
  };
};
