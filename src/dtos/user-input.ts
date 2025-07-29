import z from 'zod';

import {
  firstName,
  lastName,
  username,
  email,
  password,
  role,
  identifier,
} from './user-base';

export const userCreate = z.object({
  body: z.object({
    firstName,
    lastName,
    username,
    email,
    password,
    role,
  }),
});

export const userLogin = z.object({
  body: z.object({
    identifier,
    password,
  }),
});
