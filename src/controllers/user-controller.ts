import { Request, Response, NextFunction } from 'express';

import userService from '../services/user-service';
import responseBody from '../utils/response-body';
import { AuthPayload, AuthRequest } from '../types/auth';
import {
  toUserFind,
  toUserFindMany,
  toUserRemove,
  toUserUpdate,
  toUserUpdateProfile,
  toUserUpdateRole,
} from '../dtos/user-input';

const findProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.payload as AuthPayload;

    const output = await userService.find({ id: userId });

    res.status(200).json(responseBody.record({ resource: output }));
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

    const output = await userService.update({
      id: userId,
      firstName,
      lastName,
    });

    res.status(200).json(
      responseBody.record({
        resource: output,
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

    const output = await userService.update({ id, firstName, lastName });

    res.status(200).json(
      responseBody.record({
        resource: output,
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

    const output = await userService.updateRole({ id, role });

    res.status(200).json(
      responseBody.record({
        resource: output,
      }),
    );
  } catch (error) {
    next(error);
  }
};

const findMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { query } = toUserFindMany(req);

    const { meta, resources } = await userService.findMany(query);

    res.status(200).json(
      responseBody.paginated({
        meta,
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

    const output = await userService.find({ id });

    res.status(200).json(
      responseBody.record({
        resource: output,
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

    res.status(204).json();
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
