import { Request, Response, NextFunction } from 'express';

import {
  toProductCreate,
  toProductFind,
  toProductFindMany,
  toProductRemove,
  toProductRemoveImage,
  toProductUpdate,
  toProductUpdateIsActive,
  toProductUploadImages,
  toProductGetImages,
  toProductRemoveImages,
} from '../dtos';
import { productService } from '../services';
import { BadRequestError, resBody } from '../utils';

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
      query: {
        includeInactive,
        includeImages,
        includeCategory,
        includeInactiveCategory,
      },
    } = toProductFind(req);

    const resource = await productService.find({
      id,
      includeInactive,
      includeImages,
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

const uploadImages = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { files } = req;

    if (!files || files.length === 0) {
      throw new BadRequestError('No image provided.');
    }

    const {
      params: { id },
      query: { includeInactive },
    } = toProductUploadImages(req);

    const resources = await productService.uploadImages({
      id,
      includeInactive,
      files: files as Express.Multer.File[],
    });

    res.status(200).json(
      resBody.records({
        resources,
      }),
    );
  } catch (error) {
    next(error);
  }
};

const getImages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      params: { id },
      query: { includeInactive },
    } = toProductGetImages(req);

    const resources = await productService.getImages({
      id,
      includeInactive,
    });

    res.status(204).json(resBody.records({ resources }));
  } catch (error) {
    next(error);
  }
};

const removeImages = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      params: { id },
      query: { includeInactive },
    } = toProductRemoveImages(req);

    await productService.removeImages({
      id,
      includeInactive,
    });

    res.status(204);
  } catch (error) {
    next(error);
  }
};

const removeImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      params: { id, imageId },
      query: { includeInactive },
    } = toProductRemoveImage(req);

    await productService.removeImage({
      id,
      imageId,
      includeInactive,
    });

    res.status(204);
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
  update,
  updateIsActive,
  remove,
  uploadImages,
  getImages,
  removeImage,
  removeImages,
};
