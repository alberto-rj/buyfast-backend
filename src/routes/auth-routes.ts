import { Router } from 'express';

import { authController } from '../controllers';

export const authRoutes = Router();

authRoutes.post('/login', authController.login.bind(authController));
authRoutes.post('/logout', authController.logout.bind(authController));
authRoutes.post('/refresh', authController.refresh.bind(authController));
authRoutes.post('/register', authController.register.bind(authController));
