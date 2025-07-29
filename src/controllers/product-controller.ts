import { Request, Response, NextFunction } from 'express';

import {
  toProductCreate,
  toProductFind,
  toProductFindMany,
  toProductRemove,
  toProductUpdate,
  toProductUpdateIsActive,
} from '../dtos';
import { productService } from '../services';
import { resBody } from '../utils';

const findMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { query } = toProductFindMany(req);

    const { resources, pagination } = await productService.findMany(query);

    res.status(200).json(
      resBody.paginated({
        resources,
        pagination,
      }),
    );
  } catch (error) {
    next(error);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      query: { includeCategory, includeInactiveCategory },
      body: { name, price, quantity, sku, description, categoryId },
    } = toProductCreate(req);

    const resource = await productService.create({
      name,
      price,
      quantity,
      sku,
      description,
      categoryId,
      includeCategory,
      includeInactiveCategory,
    });

    res.status(201).json(
      resBody.record({
        resource,
      }),
    );
  } catch (error) {
    next(error);
  }
};

const find = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      params: { id },
      query: { includeInactive, includeCategory, includeInactiveCategory },
    } = toProductFind(req);

    const resource = await productService.find({
      id,
      includeInactive,
      includeCategory,
      includeInactiveCategory,
    });

    res.status(200).json(
      resBody.record({
        resource,
      }),
    );
  } catch (error) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      params: { id },
      query: { includeInactive, includeCategory, includeInactiveCategory },
      body: {
        name,
        description,
        price,
        quantity,
        sku,
        weight,
        dimensions,
        categoryId,
      },
    } = toProductUpdate(req);

    const resource = await productService.update({
      id,
      name,
      description,
      price,
      quantity,
      sku,
      weight,
      dimensions,
      categoryId,
      includeInactive,
      includeCategory,
      includeInactiveCategory,
    });

    res.status(200).json(
      resBody.record({
        resource,
      }),
    );
  } catch (error) {
    next(error);
  }
};

const updateIsActive = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      params: { id },
      query: { includeInactive, includeCategory },
      body: { isActive },
    } = toProductUpdateIsActive(req);

    const resource = await productService.updateIsActive({
      id,
      isActive,
      includeInactive,
      includeCategory,
    });

    res.status(200).json(
      resBody.record({
        resource,
      }),
    );
  } catch (error) {
    next(error);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      params: { id },
      query: { includeInactive },
    } = toProductRemove(req);

    await productService.remove({ id, includeInactive });

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const productController = {
  create,
  find,
  findMany,
  remove,
  update,
  updateIsActive,
};
