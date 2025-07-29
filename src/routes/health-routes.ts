import { Router } from 'express';

import { healthController } from '../controllers';

export const healthRoutes = Router();

healthRoutes.route('/').get(healthController.check.bind(healthController));
