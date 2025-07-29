import jwt from 'jsonwebtoken';

import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from '../config/env';
import { AuthPayload } from '../types/auth';

export const generateAccessToken = (payload: AuthPayload) => {
  return jwt.sign(payload, JWT_ACCESS_SECRET, {
    expiresIn: '7m',
  });
};

export const generateRefreshToken = (payload: AuthPayload) => {
  return jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: '7d',
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
