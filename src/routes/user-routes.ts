import { Router } from 'express';

import userController from '../controllers/user-controller';
import { authenticate } from '../middlewares/authenticate';
import { checkRoles } from '../middlewares/check-roles';

export const userRoutes = Router();

userRoutes
  .route('/me')
  .get(authenticate, userController.findProfile.bind(userController))
  .patch(authenticate, userController.updateProfile.bind(userController));

userRoutes.get(
  '/',
  authenticate,
  checkRoles(['ADMIN']),
  userController.findMany.bind(userController),
);

userRoutes
  .route('/:id')
  .get(
    authenticate,
    checkRoles(['ADMIN']),
    userController.find.bind(userController),
  )
  .patch(
    authenticate,
    checkRoles(['ADMIN']),
    userController.update.bind(userController),
  )
  .delete(
    authenticate,
    checkRoles(['ADMIN']),
    userController.remove.bind(userController),
  );

userRoutes
  .route('/:id/role')
  .patch(
    authenticate,
    checkRoles(['ADMIN']),
    userController.updateRole.bind(userController),
  );
