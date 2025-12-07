import { OpenAPIV3 } from 'openapi-types';

import { loginPath } from './login';
import { registerPath } from './register';
import { logoutPath } from './logout';
import { refreshPath } from './refresh-token';

export const authPath: OpenAPIV3.PathsObject = {
  '/auth/register': {
    ...registerPath,
  },
  '/auth/login': {
    ...loginPath,
  },
  '/auth/refresh': {
    ...refreshPath,
  },
  '/auth/logout': {
    ...logoutPath,
  },
};
