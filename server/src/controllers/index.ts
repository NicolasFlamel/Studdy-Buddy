import { Router } from 'express';
import { apiRouter } from './api';
import { homeRouter } from './home.routes';

export const router = Router();

router.use('/api', apiRouter);
router.use('/', homeRouter);
