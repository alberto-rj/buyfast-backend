import { Router } from 'express';

import { heathController } from '../controllers';

export const healthRoutes = Router();

healthRoutes.route('/').get(heathController.check.bind(heathController));
