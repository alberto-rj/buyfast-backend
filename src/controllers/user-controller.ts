import { Request, Response, NextFunction } from 'express';

import { userService } from '../services';
import { resBody } from '../utils';
import { AuthPayload, AuthRequest } from '../types';
import {
  toUserFind,
  toUserFindMany,
  toUserRemove,
  toUserUpdate,
  toUserUpdateProfile,
  toUserUpdateRole,
} from '../dtos';

const findProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.payload as AuthPayload;

    const resource = await userService.find({ id: userId });

    res.status(200).json(
      resBody.record({
        resource,
      }),
    );
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.payload as AuthPayload;

    const {
      body: { firstName, lastName },
    } = toUserUpdateProfile(req);

    const resource = await userService.update({
      id: userId,
      firstName,
      lastName,
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
      body: { firstName, lastName },
    } = toUserUpdate(req);

    const resource = await userService.update({ id, firstName, lastName });

    res.status(200).json(
      resBody.record({
        resource,
      }),
    );
  } catch (error) {
    next(error);
  }
};

const updateRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      params: { id },
      body: { role },
    } = toUserUpdateRole(req);

    const resource = await userService.updateRole({ id, role });

    res.status(200).json(
      resBody.record({
        resource,
      }),
    );
  } catch (error) {
    next(error);
  }
};

const findMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { query } = toUserFindMany(req);

    const { pagination, resources } = await userService.findMany(query);

    res.status(200).json(
      resBody.paginated({
        pagination,
        resources,
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
    } = toUserFind(req);

    const resource = await userService.find({ id });

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
    } = toUserRemove(req);

    await userService.remove({ id });

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export default {
  findProfile,
  findMany,
  find,
  update,
  updateProfile,
  updateRole,
  remove,
};
