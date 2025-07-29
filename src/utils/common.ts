export abstract class ModelFindManyBuilder<T> {
  protected args?: Record<string, any>;
  protected where?: Record<string, any>;
  protected include?: Record<string, boolean>;
  protected orderBy?: Record<string, 'asc' | 'desc'>;
  protected skip?: number;
  protected take?: number;

  protected initArgs() {
    if (typeof this.args === 'undefined') {
      this.args = {};
    }
    return this;
  }

  protected initWhere() {
    if (typeof this.where === 'undefined') {
      this.where = {};
    }
    return this;
  }

  protected initInclude() {
    if (typeof this.include === 'undefined') {
      this.include = {};
    }
    return this;
  }

  protected initOrderBy() {
    if (typeof this.orderBy === 'undefined') {
      this.orderBy = {};
    }
    return this;
  }

  protected setSkip(count?: number) {
    if (typeof count === 'number') {
      this.skip = count;
    }
    return this;
  }

  protected setTake(count?: number) {
    if (typeof count === 'number') {
      this.take = count;
    }
    return this;
  }

  protected initOR() {
    this.initWhere();

    if (!Array.isArray(this.where!.OR)) {
      this.where!.OR = [];
    }

    return this;
  }

  protected initWhereCreatedAt() {
    this.initWhere();

    if (typeof this.where!.createdAt === 'undefined') {
      this.initWhere().where!.createdAt = {};
    }

    return this;
  }

  protected whereMinCreateAt(date?: Date) {
    if (typeof date === 'object') {
      this.initWhereCreatedAt().where!.createdAt.gte = date;
    }
    return this;
  }

  protected whereMaxCreateAt(date?: Date) {
    if (typeof date === 'object') {
      this.initWhereCreatedAt().where!.createdAt.lte = date;
    }
    return this;
  }

  protected initWhereUpdatedAt() {
    this.initWhere();

    if (typeof this.where!.updatedAt === 'undefined') {
      this.initWhere().where!.updatedAt = {};
    }

    return this;
  }

  protected whereMinUpdatedAt(date?: Date) {
    if (typeof date === 'object') {
      this.initWhereUpdatedAt().where!.updatedAt.gte = date;
    }
    return this;
  }

  protected whereMaxUpdatedAt(date?: Date) {
    if (typeof date === 'object') {
      this.initWhereUpdatedAt().where!.updatedAt.lte = date;
    }
    return this;
  }

  protected whereIsActive(isActive?: boolean) {
    if (typeof isActive === 'boolean') {
      this.initWhere().where!.isActive = isActive;
    }
    return this;
  }

  protected setOrderBy(options?: { fieldName: string; order: 'asc' | 'desc' }) {
    if (typeof options === 'object') {
      const { fieldName, order } = options;
      this.initOrderBy().orderBy![fieldName] = order;
    }
    return this;
  }

  abstract build(input: T): Record<string, any>;
}
