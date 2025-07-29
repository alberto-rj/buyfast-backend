import { ProductFindManyInput } from '../dtos';
import { canIncludeInactive, ModelFindManyBuilder } from '../utils';

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
    const { where, orderBy, include, take, skip } = this.whereSearchForName(
      search,
    )
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

    return { where, orderBy, include, take, skip };
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

  private includeCategory(canInclude?: boolean) {
    if (typeof canInclude === 'boolean') {
      this.initInclude().include!.category = canInclude;
    }
    return this;
  }
}

export const getProductFindManyArgs = (input: ProductFindManyInput) => {
  return new ProductFindManyBuilder().build(input);
};
