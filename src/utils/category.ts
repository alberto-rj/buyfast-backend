import { CategoryFindManyInput } from '../dtos';
import { canIncludeInactive, ModelFindManyBuilder } from '../utils';

class CategoryFindManyBuilder extends ModelFindManyBuilder<CategoryFindManyInput> {
  constructor() {
    super();
  }

  build({
    search,
    minCreatedAt,
    maxCreatedAt,
    minUpdatedAt,
    maxUpdatedAt,
    includeInactive,
    limit,
    page,
    sortBy,
    order,
  }: CategoryFindManyInput): Record<string, any> {
    const { where, orderBy, take, skip } = this.whereSearchForName(search)
      .whereSearchForDescription(search)
      .whereIsActive(canIncludeInactive(includeInactive))
      .whereMinCreateAt(minCreatedAt)
      .whereMaxCreateAt(maxCreatedAt)
      .whereMinUpdatedAt(minUpdatedAt)
      .whereMaxUpdatedAt(maxUpdatedAt)
      .setOrderBy({ fieldName: sortBy, order })
      .setTake(limit)
      .setSkip((page - 1) * limit);

    return { where, orderBy, take, skip };
  }

  private whereSearchForName(search?: string) {
    if (typeof search === 'string') {
      this.initOR().where!.OR.push({
        name: { contains: search, mode: 'insensitive' },
      });
    }
    return this;
  }

  private whereSearchForDescription(search?: string) {
    if (typeof search === 'string') {
      this.initOR().where!.OR.push({
        description: { contains: search, mode: 'insensitive' },
      });
    }
    return this;
  }
}

export const getCategoryFindManyArgs = (input: CategoryFindManyInput) => {
  return new CategoryFindManyBuilder().build(input);
};
