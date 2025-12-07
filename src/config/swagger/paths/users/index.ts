import { OpenAPIV3 } from 'openapi-types';
import { getUserProfilePath } from './get-user-profile';
import { getUsersPath } from './get-users';
import { updateUserProfilePath } from './update-user-profile';
import { updateUserRolePath } from './update-user-role';
import { getUserPath } from './get-user';
import { deleteUserPath } from './delete-user';

export const userPaths: OpenAPIV3.PathsObject = {
  '/users': {
    ...getUsersPath,
  },
  '/users/{id}': {
    ...getUserPath,
    ...deleteUserPath,
  },
  '/users/{id}/role': {
    ...updateUserRolePath,
  },
  '/users/me': {
    ...getUserProfilePath,
    ...updateUserProfilePath,
  },
};
