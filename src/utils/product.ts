import { ProductFindManyInput } from '../dtos';
import { canIncludeInactive } from '../utils';

abstract class ModelFindManyBuilder<T> {
  protected args?: Record<string, any>;
  protected where?: Record<string, any>;
  protected include?: Record<string, boolean>;
  protected orderBy?: Record<string, 'asc' | 'desc'>;
  protected skip?: number;
  protected take?: number;

  protected initArgs() {
    if (!this.args) {
      this.args = {};
    }
    return this;
  }

  protected initWhere() {
    if (!this.where) {
      this.where = {};
    }
    return this;
  }

  protected initInclude() {
    if (!this.include) {
      this.include = {};
    }
    return this;
  }

  protected initOrderBy() {
    if (!this.orderBy) {
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

  abstract build(input: T): Record<string, any>;
}

class ProductFindManyBuilder extends ModelFindManyBuilder<ProductFindManyInput> {
  constructor() {
    super();
  }

  build({
    category,
    search,
    minPrice,
    maxPrice,
    minQuantity,
    maxQuantity,
    minWeight,
    maxWeight,
    minCreatedAt,
    maxCreatedAt,
    minUpdatedAt,
    maxUpdatedAt,
    includeInactive,
    includeCategory,
    includeInactiveCategory,
    limit,
    page,
    sortBy,
    order,
  }: ProductFindManyInput): Record<string, any> {
    const { where, include, take, skip } = this.whereSearchForName(search)
      .whereSearchForDescription(search)
      .whereSearchForSku(search)
      .whereSearchForCategory(search)
      .whereCategoryName(category)
      .whereCategoryIsActive(canIncludeInactive(includeInactiveCategory))
      .whereIsActive(canIncludeInactive(includeInactive))
      .whereMinPrice(minPrice)
      .whereMaxPrice(maxPrice)
      .whereMinQuantity(minQuantity)
      .whereMaxQuantity(maxQuantity)
      .whereMinWeight(minWeight)
      .whereMaxWeight(maxWeight)
      .whereMinCreateAt(minCreatedAt)
      .whereMaxCreateAt(maxCreatedAt)
      .whereMinUpdatedAt(minUpdatedAt)
      .whereMaxUpdatedAt(maxUpdatedAt)
      .setTake(limit)
      .setSkip((page - 1) * limit)
      .setOrderBy({ fieldName: sortBy, order })
      .includeCategory(includeCategory);

    return { where, include, take, skip };
  }

  private initWhereCategory() {
    if (!this.initWhere().where!.category) {
      this.where!.category = {};
    }
    return this;
  }

  private whereCategoryName(name?: string) {
    if (typeof name === 'string') {
      this.initWhereCategory().where!.category.name = name;
    }
    return this;
  }

  private whereCategoryIsActive(isActive?: boolean) {
    if (typeof isActive === 'boolean') {
      this.initWhereCategory().where!.category.isActive = isActive;
    }
    return this;
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

  private whereSearchForSku(search?: string) {
    if (typeof search === 'string') {
      this.initOR().where!.OR.push({
        sku: { contains: search, mode: 'insensitive' },
      });
    }
    return this;
  }

  private whereSearchForCategory(search?: string) {
    if (typeof search === 'string') {
      this.initOR().where!.OR.push({
        category: {
          name: { contains: search, mode: 'insensitive' },
        },
      });
    }
    return this;
  }

  private initWherePrice() {
    if (!this.initWhere().where!.price) {
      this.initWhere().where!.price = {};
    }
    return this;
  }

  private whereMinPrice(price?: number) {
    if (typeof price === 'number') {
      this.initWherePrice().where!.price.gte = price;
    }
    return this;
  }

  private whereMaxPrice(price?: number) {
    if (typeof price === 'number') {
      this.initWherePrice().where!.price.lte = price;
    }
    return this;
  }

  private initWhereQuantity() {
    if (!this.initWhere().where!.quantity) {
      this.initWhere().where!.quantity = {};
    }
    return this;
  }

  private whereMinQuantity(quantity?: number) {
    if (typeof quantity === 'number') {
      this.initWhereQuantity().where!.quantity.gte = quantity;
    }
    return this;
  }

  private whereMaxQuantity(quantity?: number) {
    if (typeof quantity === 'number') {
      this.initWhereQuantity().where!.quantity.lte = quantity;
    }
    return this;
  }

  private initWhereWeight() {
    if (!this.initWhere().where!.weight) {
      this.initWhere().where!.weight = {};
    }
    return this;
  }

  private whereMinWeight(weight?: number) {
    if (typeof weight === 'number') {
      this.initWhereWeight().where!.weight.gte = weight;
    }
    return this;
  }

  private whereMaxWeight(weight?: number) {
    if (typeof weight === 'number') {
      this.initWhereWeight().where!.weight.lte = weight;
    }
    return this;
  }

  private initWhereCreatedAt() {
    this.initWhere();

    if (typeof this.where!.createdAt === 'undefined') {
      this.initWhere().where!.createdAt = {};
    }

    return this;
  }

  private whereMinCreateAt(date?: Date) {
    if (typeof date === 'object') {
      this.initWhereCreatedAt().where!.createdAt.gte = date;
    }
    return this;
  }

  private whereMaxCreateAt(date?: Date) {
    if (typeof date === 'object') {
      this.initWhereCreatedAt().where!.createdAt.lte = date;
    }
    return this;
  }

  private initWhereUpdatedAt() {
    this.initWhere();

    if (typeof this.where!.updatedAt === 'undefined') {
      this.initWhere().where!.updatedAt = {};
    }

    return this;
  }

  private whereMinUpdatedAt(date?: Date) {
    if (typeof date === 'object') {
      this.initWhereUpdatedAt().where!.updatedAt.gte = date;
    }
    return this;
  }

  private whereMaxUpdatedAt(date?: Date) {
    if (typeof date === 'object') {
      this.initWhereUpdatedAt().where!.updatedAt.lte = date;
    }
    return this;
  }

  private whereIsActive(isActive?: boolean) {
    if (typeof isActive === 'boolean') {
      this.initWhere().where!.isActive = isActive;
    }
    return this;
  }

  private includeCategory(canInclude?: boolean) {
    if (typeof canInclude === 'boolean') {
      this.initInclude().include!.category = canInclude;
    }
    return this;
  }

  private setOrderBy(options?: { fieldName: string; order: 'asc' | 'desc' }) {
    if (typeof options === 'object') {
      const { fieldName, order } = options;
      this.initOrderBy().orderBy![fieldName] = order;
    }
    return this;
  }
}

export const getProductFindManyArgs = (input: ProductFindManyInput) => {
  return new ProductFindManyBuilder().build(input);
};
