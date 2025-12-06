import { Request, Response, NextFunction } from 'express';

import { isProductionEnv } from '../config';
import { authService } from '../services';
import {
  toUserCreate,
  toUserLogin,
  toUserLogout,
  toUserRefresh,
} from '../dtos';
import { resBody, refreshTokenExpiresAt } from '../utils';
import { StatusCodes } from 'http-status-codes';

const createCookie = (res: Response, refreshToken: string) => {
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: isProductionEnv,
    sameSite: 'strict',
    maxAge: refreshTokenExpiresAt().getTime(),
  });
};

const clearCookie = (res: Response) => {
  res.clearCookie('refreshToken');
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = toUserCreate(req);

    const { accessToken, refreshToken, user } =
      await authService.register(body);

    createCookie(res, refreshToken);

    res.status(StatusCodes.CREATED).json(
      resBody.auth({
        accessToken,
        user,
      }),
    );
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = toUserLogin(req);

    const { accessToken, refreshToken, user } = await authService.login(body);

    createCookie(res, refreshToken);

    res.status(StatusCodes.OK).json(
      resBody.auth({
        accessToken,
        user,
      }),
    );
  } catch (error) {
    next(error);
  }
};

const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      cookies: { refreshToken },
    } = toUserRefresh(req);

    const { accessToken, user } = await authService.refresh(refreshToken);

    createCookie(res, refreshToken);

    res.status(StatusCodes.OK).json(
      resBody.auth({
        accessToken,
        user,
      }),
    );
  } catch (error) {
    next(error);
  }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      cookies: { refreshToken },
    } = toUserLogout(req);

    await authService.logout(refreshToken);

    clearCookie(res);

    res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (error) {
    next(error);
  }
};

export const authController = {
  login,
  logout,
  refresh,
  register,
};
