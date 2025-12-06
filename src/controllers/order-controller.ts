import { Request, Response, NextFunction } from 'express';
import { orderService } from '../services';
import {
  toOrderCancel,
  toOrderCreate,
  toOrderGet,
  toOrderGetOf,
  toOrderGetAll,
  toOrderGetAllOf,
  toOrderUpdateStatus,
} from '../dtos';
import { AuthPayload, AuthRequest } from '../types';
import { resBody } from '../utils';
import { StatusCodes } from 'http-status-codes';

const create = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.payload as AuthPayload;
    const {
      body: { deliveryAddress },
    } = toOrderCreate(req);

    const resource = await orderService.create({ deliveryAddress, userId });

    res.status(StatusCodes.CREATED).json(resBody.updated({ resource }));
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

    res.status(StatusCodes.OK).json(resBody.record({ resource }));
  } catch (error) {
    next(error);
  }
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { params } = toOrderGetAll(req);

    const resources = await orderService.getAll(params);

    res.status(StatusCodes.OK).json(resBody.records({ resources }));
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

    res.status(StatusCodes.OK).json(resBody.records({ resources }));
  } catch (error) {
    next(error);
  }
};

const getOf = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.payload as AuthPayload;
    const { params } = toOrderGetOf(req);

    const resources = await orderService.getOf({ ...params, userId });

    res.status(StatusCodes.OK).json(resBody.records({ resources }));
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

    res.status(StatusCodes.OK).json(resBody.record({ resource }));
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

    res.status(StatusCodes.OK).json(resBody.record({ resource }));
  } catch (error) {
    next(error);
  }
};

export const orderController = {
  cancel,
  create,
  get,
  getOf,
  getAll,
  getAllOf,
  updateStatus,
};
