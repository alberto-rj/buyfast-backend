import { OpenAPIV3 } from 'openapi-types';

import { loginPath } from './login';
import { registerPath } from './register';

export const authPath: OpenAPIV3.PathsObject = {
  ...loginPath,
  ...registerPath,
};
