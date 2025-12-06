import { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { toCartAdd, toCartList, toCartRemove, toCartUpdate } from '../dtos';
import { AuthRequest } from '../types';
import { cartService } from '../services';
import { resBody } from '../utils';

const list = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const {
      query: { includeProduct, page, limit },
    } = toCartList(req);

    const userId = req.payload!.userId;

    const resource = await cartService.list({
      includeProduct,
      limit,
      page,
      userId,
    });

    res.status(StatusCodes.OK).json(resBody.record({ resource }));
  } catch (error) {
    next(error);
  }
};

const clear = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.payload!.userId;

    await cartService.clear({ userId });

    res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (error) {
    next(error);
  }
};

const add = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const {
      query: { includeProduct },
      body: { productId, quantity },
    } = toCartAdd(req);

    const userId = req.payload!.userId;

    const resource = await cartService.add({
      userId,
      productId,
      quantity,
      includeProduct,
    });

    res.status(StatusCodes.CREATED).json(
      resBody.record({
        resource,
      }),
    );
  } catch (error) {
    next(error);
  }
};

const update = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const {
      params: { id },
      query: { includeProduct },
      body: { quantity },
    } = toCartUpdate(req);

    const userId = req.payload!.userId;

    const resource = await cartService.update({
      id,
      userId,
      quantity,
      includeProduct,
    });

    res.status(StatusCodes.OK).json(
      resBody.record({
        resource,
      }),
    );
  } catch (error) {
    next(error);
  }
};

const remove = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const {
      params: { id },
    } = toCartRemove(req);

    const userId = req.payload!.userId;

    await cartService.remove({
      id,
      userId,
    });

    res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (error) {
    next(error);
  }
};

export const cartController = {
  add,
  update,
  remove,
  list,
  clear,
};
