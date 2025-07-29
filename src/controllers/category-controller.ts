import { Request, Response, NextFunction } from 'express';

import {
  toCategoryCreate,
  toCategoryFind,
  toCategoryFindMany,
  toCategoryRemove,
  toCategoryUpdate,
  toCategoryUpdateIsActive,
} from '../dtos';
import { categoryService } from '../services';
import { resBody } from '../utils';

const findMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { query } = toCategoryFindMany(req);

    const { resources, pagination } = await categoryService.findMany(query);

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
    const { body } = toCategoryCreate(req);

    const resource = await categoryService.create(body);

    res.status(201).json(resBody.record({ resource }));
  } catch (error) {
    next(error);
  }
};

const find = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      params: { id },
      query: { includeInactive },
    } = toCategoryFind(req);

    const resource = await categoryService.find({ id, includeInactive });

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
      query: { includeInactive },
      body: { name, description, slug },
    } = toCategoryUpdate(req);

    const resource = await categoryService.update({
      id,
      name,
      description,
      slug,
      includeInactive,
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
      query: { includeInactive },
      body: { isActive },
    } = toCategoryUpdateIsActive(req);

    const resource = await categoryService.updateIsActive({
      id,
      includeInactive,
      isActive,
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
    } = toCategoryRemove(req);

    await categoryService.remove({ id, includeInactive });

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const categoryController = {
  create,
  findMany,
  find,
  remove,
  update,
  updateIsActive,
};
