import jwt from 'jsonwebtoken';

import {
  JWT_ACCESS_SECRET,
  JWT_ACCESS_SECRET_EXPIRES_IN_MINUTES,
  JWT_REFRESH_SECRET,
  JWT_REFRESH_SECRET_EXPIRES_IN_DAYS,
} from '../config';
import { AuthPayload } from '../types';

export const generateAccessToken = (payload: AuthPayload) => {
  return jwt.sign(payload, JWT_ACCESS_SECRET, {
    expiresIn: `${JWT_ACCESS_SECRET_EXPIRES_IN_MINUTES}m`,
  });
};

export const generateRefreshToken = (payload: AuthPayload) => {
  return jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: `${JWT_REFRESH_SECRET_EXPIRES_IN_DAYS}d`,
  });
};

export const verifyAccessToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_ACCESS_SECRET) as AuthPayload;
  } catch (error) {
    return null;
  }
};

export const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET) as AuthPayload;
  } catch (error) {
    return null;
  }
};

export const refreshTokenExpiresAt = () => {
  const expiriesAt = new Date(
    Date.now() + JWT_REFRESH_SECRET_EXPIRES_IN_DAYS * 24 * 60 * 60 * 1000,
  );
  return expiriesAt;
};

export const accessTokenExpiresAt = () => {
  const expiriesAt = new Date(
    Date.now() + JWT_ACCESS_SECRET_EXPIRES_IN_MINUTES * 60 * 1000,
  );
  return expiriesAt;
};
