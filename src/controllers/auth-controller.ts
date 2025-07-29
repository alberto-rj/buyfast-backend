import { Request, Response, NextFunction } from 'express';

import { isProductionEnv } from '../config/server';
import authService from '../services/auth-service';
import {
  toUserCreate,
  toUserLogin,
  toUserLogout,
  toUserRefresh,
} from '../dtos/user-input';
import responseBody from '../utils/response-body';
import { refreshTokenExpiresAt } from '../utils/jwt';

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

    res.status(201).json(responseBody.auth({ accessToken, user }));
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = toUserLogin(req);

    const { accessToken, refreshToken, user } = await authService.login(body);

    createCookie(res, refreshToken);

    res.status(200).json(responseBody.auth({ accessToken, user }));
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

    res.status(200).json(responseBody.auth({ accessToken, user }));
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

    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

export default {
  login,
  logout,
  refresh,
  register,
};
