import { db } from '@/db';
import { Request, Response, Router } from 'express';
import { withAuth } from '@/utils/auth';
import { reply } from '@/utils/helpers';
import { getUserByIdPublic } from '@/db/queries/users';
import {
  ApiResult,
  GetUserByIdData,
  UserMeAPIData,
} from '@studdy-buddy/shared/src/types/api';
import { uuidSchema } from '@shared/schemas';

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

type GetUserResType = Response<ApiResult<GetUserByIdData>>;
userRouter.get('/:userId', async (req: Request, res: GetUserResType) => {
  const { userId } = req.params;

  if (!userId) {
    req.log.warn('Missing userId.');
    return res.status(400).json(reply(null, 'Missing userId.'));
  }

  const { success } = uuidSchema.safeParse(userId);

  if (!success) {
    return res.status(400).json(reply(null, 'Incorrect userId must be a uuid'));
  }

  try {
    const userData = await db.query.users.findFirst({
      where: { id: userId },
      columns: { id: true, isActive: true, username: true },
      with: {
        schedules: { orderBy: { date: 'asc' } },
      },
    });

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

export { userRouter };
