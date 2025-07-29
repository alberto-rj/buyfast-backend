import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

import { UserRole } from './';

export interface AuthPayload extends JwtPayload {
  userId: string;
  username: string;
  email: string;
  role: UserRole;
}

export interface AuthRequest extends Request {
  payload?: AuthPayload;
}
