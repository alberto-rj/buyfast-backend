import { Router } from 'express';

import { userController } from '../controllers';
import { authenticate, checkRoles, requireAdmin } from '../middlewares';

export const userRoutes = Router();

userRoutes
  .route('/me')
  .get(authenticate, userController.findProfile.bind(userController))
  .patch(authenticate, userController.updateProfile.bind(userController));

userRoutes.get(
  '/',
  authenticate,
  requireAdmin,
  userController.findMany.bind(userController),
);

userRoutes
  .route('/:id')
  .get(authenticate, requireAdmin, userController.find.bind(userController))
  .patch(authenticate, requireAdmin, userController.update.bind(userController))
  .delete(
    authenticate,
    requireAdmin,
    userController.remove.bind(userController),
  );

userRoutes
  .route('/:id/role')
  .patch(
    authenticate,
    requireAdmin,
    userController.updateRole.bind(userController),
  );
