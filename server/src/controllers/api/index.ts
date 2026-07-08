import { Router } from 'express';
import { userRouter } from './users.routes';
import { chatRouter } from './chats.routes';
import { scoreRouter } from './scores.routes';
import { scheduleRouter } from './schedules.routes';
import { authRouter } from './auth';

export const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/chats', chatRouter);
apiRouter.use('/scores', scoreRouter);
apiRouter.use('/schedules', scheduleRouter);
apiRouter.use('/*', (_, res) => {
  res.status(404).json({ message: 'Route not found' });
});
