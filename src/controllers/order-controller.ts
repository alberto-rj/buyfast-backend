import { Request, Response, NextFunction } from 'express';
import { orderService } from '../services';
import {
  toOrderCancel,
  toOrderCreate,
  toOrderGet,
  toOrderGetAll,
  toOrderGetAllOf,
  toOrderUpdateStatus,
} from '../dtos';
import { AuthPayload, AuthRequest } from '../types';
import { resBody } from '../utils';

const create = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.payload as AuthPayload;
    const {
      body: { deliveryAddress },
    } = toOrderCreate(req);

    const resource = await orderService.create({ deliveryAddress, userId });

    res.status(201).json(resBody.updated({ resource }));
  } catch (error) {
    next(error);
  }
};

const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      params: { id },
    } = toOrderGet(req);

    const resource = await orderService.get({ id });

    res.status(200).json(resBody.record({ resource }));
  } catch (error) {
    next(error);
  }
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { params } = toOrderGetAll(req);

    const resources = await orderService.getAll(params);

    res.status(200).json(resBody.records({ resources }));
  } catch (error) {
    next(error);
  }
};

const getAllOf = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.payload as AuthPayload;
    const { params } = toOrderGetAllOf(req);

    const resources = await orderService.getAllOf({ ...params, userId });

    res.status(200).json(resBody.records({ resources }));
  } catch (error) {
    next(error);
  }
};

const updateStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      params: { id },
      body: { status },
    } = toOrderUpdateStatus(req);

    const resource = await orderService.updateStatus({ id, status });

    res.status(200).json(resBody.record({ resource }));
  } catch (error) {
    next(error);
  }
};

const cancel = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.payload as AuthPayload;
    const {
      params: { id },
    } = toOrderCancel(req);

    const resource = await orderService.cancel({ userId, id });

    res.status(200).json(resBody.record({ resource }));
  } catch (error) {
    next(error);
  }
};

export const orderController = {
  cancel,
  create,
  get,
  getAll,
  getAllOf,
  updateStatus,
};
