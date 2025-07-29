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
  checkRoles(['Admin']),
  userController.findMany.bind(userController),
);

userRoutes
  .route('/:id')
  .get(
    authenticate,
    checkRoles(['Admin']),
    userController.find.bind(userController),
  )
  .patch(
    authenticate,
    checkRoles(['Admin']),
    userController.update.bind(userController),
  )
  .delete(
    authenticate,
    checkRoles(['Admin']),
    userController.remove.bind(userController),
  );

userRoutes
  .route('/:id/role')
  .patch(
    authenticate,
    checkRoles(['Admin']),
    userController.updateRole.bind(userController),
  );
