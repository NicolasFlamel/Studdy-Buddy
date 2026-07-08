import z from 'zod';
import { Request, Response, Router } from 'express';
import { withAuth } from '@/utils/auth';
import { reply } from '@/utils/helpers';
import { getUserByIdPublic } from '@/db/queries/users';
import {
  ApiResult,
  GetUserPublicByIdData,
  GetUserSchedules,
  UserMeAPIData,
} from '@studdy-buddy/shared/src/types/api';
import { uuidSchema } from '@shared/schemas';
import { getUserSchedule } from '@/db/queries/schedules';

const userRouter = Router();

type GetResType = Response<ApiResult<UserMeAPIData>>;
userRouter.get('/me', withAuth, async (req: Request, res: GetResType) => {
  const { userId } = req.session;

  if (!userId) {
    req.log.error('No userId in withAuth route.');
    return res.status(401).json(reply(null, 'You are not logged in.'));
  }

  try {
    const userData = await getUserByIdPublic(userId);

    if (!userData) {
      req.log.error('Could not find user ' + userId);

      return res.status(404).json(reply(null, 'User not found.'));
    }

    return res.status(200).json(reply(userData));
  } catch (error) {
    req.log.error(error);

    return res.status(500).json(reply(null, 'Something went wrong.'));
  }
});

type GetUserResType = Response<ApiResult<GetUserPublicByIdData>>;
userRouter.get('/:userId', async (req: Request, res: GetUserResType) => {
  const { userId } = req.params;

  if (!userId) {
    req.log.warn('Missing userId.');
    return res.status(400).json(reply(null, 'Missing userId.'));
  }

  const { success, error, data } = uuidSchema.safeParse(userId);

  if (!success) {
    const zodError = z.flattenError(error).fieldErrors;
    req.log.warn(
      { zodError, userId },
      'Parse schema failed for creating schedule.',
    );

    return res.status(400).json(reply(null, 'Incorrect userId must be a uuid'));
  }

  try {
    const userData = await getUserByIdPublic(data);

    if (!userData) {
      req.log.warn({ userId }, 'User not found.');
      return res.status(404).json(reply(null, 'User not found.'));
    }

    return res.status(200).json(reply(userData));
  } catch (error) {
    req.log.error({ error, userId });
    return res.status(500).json(reply(null, 'Something went wrong.'));
  }
});

type GetUserScheduleResType = Response<ApiResult<GetUserSchedules>>;
userRouter.get(
  '/:userId/schedules',
  async (req: Request, res: GetUserScheduleResType) => {
    const { userId } = req.params;

    if (!userId) {
      req.log.warn('Missing userId.');
      return res.status(400).json(reply(null, 'Missing userId.'));
    }

    const { success, data, error } = uuidSchema.safeParse(userId);

    if (!success) {
      const zodError = z.flattenError(error).fieldErrors;
      req.log.warn(
        { zodError, userId },
        'Parse schema failed for creating schedule.',
      );

      return res
        .status(400)
        .json(reply(null, 'Incorrect userId must be a uuid'));
    }

    try {
      const scheduleData = await getUserSchedule(data);

      if (!scheduleData) {
        req.log.warn({ userId }, 'Schedules not found.');
        return res.status(404).json(reply(null, 'Schedules not found.'));
      }

      return res.status(200).json(reply(scheduleData));
    } catch (error) {
      req.log.error({ error, userId });
      return res.status(500).json(reply(null, 'Something went wrong.'));
    }
  },
);

export { userRouter };
