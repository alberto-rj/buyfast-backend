import { Router } from 'express';

import { check } from '../controllers/heath-controller';

export const healthRoutes = Router();

healthRoutes.get('/', check);
