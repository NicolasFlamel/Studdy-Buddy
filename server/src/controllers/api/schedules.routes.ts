import { db } from '@/db';
import { Request, Response, Router } from 'express';
import { schedules } from '@/db/schema';
import { withAuth } from '@/utils/auth';
import { reply } from '@/utils/helpers';
import {
  CreateScheduleSchema,
  EditScheduleSchema,
} from '@shared/schemas/schedules';
import {
  ApiResult,
  DeleteScheduleData,
  PostScheduleData,
} from '@shared/types/api';
import { deleteSchedule, updateSchedule } from '@/db/queries/schedules';

export const scheduleRouter = Router();

type PostResType = Response<ApiResult<PostScheduleData>>;
scheduleRouter.post('/', withAuth, async (req: Request, res: PostResType) => {
  const { userId } = req.session;
  const { date } = req.body;

  if (!userId) {
    req.log.error('No userId in withAuth route.');
    return res.status(401).json(reply(null, 'You are not logged in.'));
  } else if (!date) {
    return res.status(400).json(reply(null, 'Missing date in body.'));
  }

  const { success, error, data } = CreateScheduleSchema.safeParse({
    date,
    userId,
  });

  if (!success) {
    req.log.warn(
      { error, userId, date },
      'Parse schema failed for creating schedule.',
    );
    return res.status(400).json(reply(null, 'Incorrect data format.'));
  }

  try {
    const [schedule] = await db.insert(schedules).values(data).returning();

    if (!schedule) throw new Error('No data was returned after inserting.');

    return res.status(200).json(reply(schedule));
  } catch (error) {
    req.log.error(error);
    return res.status(500).json(reply(null, 'Something went wrong.'));
  }
});

scheduleRouter.post(
  '/:scheduleId',
  withAuth,
  async (req: Request, res: PostResType) => {
    const { userId } = req.session;
    const { scheduleId } = req.params;

    if (!userId) {
      req.log.error('No userId in withAuth route.');
      return res.status(401).json(reply(null, 'You are not logged in.'));
    }

    const { success, data, error } = EditScheduleSchema.safeParse({
      ...req.body,
      id: scheduleId,
      userId,
    });

    if (!success) {
      const zodError = z.flattenError(error).fieldErrors;
      req.log.warn(
        { zodError, userId },
        'Parse schema failed for creating schedule.',
      );
      return res.status(400).json(reply(null, 'Incorrect data format.'));
    }

    try {
      const [schedule] = await updateSchedule(data, {
        id: data.id,
        userId,
      }).returning();

      if (!schedule) throw new Error('No data was returned after inserting.');

      return res.status(200).json(reply(schedule));
    } catch (error) {
      req.log.error(error);
      return res.status(500).json(reply(null, 'Something went wrong.'));
    }
  },
);

type DeleteByIdResType = Response<ApiResult<DeleteScheduleData>>;
scheduleRouter.delete(
  '/:scheduleId',
  withAuth,
  async (req: Request, res: DeleteByIdResType) => {
    const { userId } = req.session;
    const { scheduleId } = req.params;

    if (!userId) {
      req.log.error({ userId }, 'UserId empty after passing withAuth');
      return res.status(500).json(reply(null, 'Something went wrong.'));
    } else if (!scheduleId) {
      req.log.warn({ userId }, 'Missing scheduleId.');
      return res.status(400).json(reply(null, 'Missing scheduleId.'));
    }

    try {
      await deleteSchedule({ id: scheduleId, userId });

      return res.status(200).json(reply(undefined));
    } catch (error) {
      req.log.error({ error, userId, scheduleId });
      return res.status(500).json(reply(null, 'Something went wrong.'));
    }
  },
);
