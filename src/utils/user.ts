import { UserFindManyInput } from '../dtos';
import { UserRole } from '../types';
import { canIncludeInactive, ModelFindManyBuilder } from '../utils';

class UserFindManyBuilder extends ModelFindManyBuilder<UserFindManyInput> {
  constructor() {
    super();
  }

  build({
    role,
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
  }: UserFindManyInput): Record<string, any> {
    const { where, orderBy, take, skip } = this.whereIsActive(
      canIncludeInactive(includeInactive),
    )
      .whereRole(role)
      .whereSearchFirstName(search)
      .whereSearchLastName(search)
      .whereSearchEmail(search)
      .whereSearchUsername(search)
      .whereMinCreateAt(minCreatedAt)
      .whereMaxCreateAt(maxCreatedAt)
      .whereMinUpdatedAt(minUpdatedAt)
      .whereMaxUpdatedAt(maxUpdatedAt)
      .setOrderBy({ fieldName: sortBy, order })
      .setTake(limit)
      .setSkip((page - 1) * limit);

    return { where, orderBy, take, skip };
  }

  private whereRole(role?: UserRole) {
    if (typeof role !== 'undefined') {
      this.initWhere().where!.role = role;
    }
    return this;
  }

  private whereSearchFirstName(search?: string) {
    if (typeof search === 'string') {
      this.initOR().where!.OR.push({
        firstName: { contains: search, mode: 'insensitive' },
      });
    }
    return this;
  }

  private whereSearchLastName(search?: string) {
    if (typeof search === 'string') {
      this.initOR().where!.OR.push({
        lastName: { contains: search, mode: 'insensitive' },
      });
    }
    return this;
  }

  private whereSearchEmail(search?: string) {
    if (typeof search === 'string') {
      this.initOR().where!.OR.push({
        email: { contains: search, mode: 'insensitive' },
      });
    }
    return this;
  }

  private whereSearchUsername(search?: string) {
    if (typeof search === 'string') {
      this.initOR().where!.OR.push({
        username: { contains: search, mode: 'insensitive' },
      });
    }
    return this;
  }
}

export const getUserFindManyArgs = (input: UserFindManyInput) => {
  return new UserFindManyBuilder().build(input);
};
