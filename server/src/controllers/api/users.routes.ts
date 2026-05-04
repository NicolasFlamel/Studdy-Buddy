import { Request, Response, Router } from 'express';
import { withAuth } from '@/utils/auth';
import { reply } from '@/utils/helpers';
import { getUserByIdPublic } from '@/db/queries/users';
import { ApiResult, UserMeAPIData } from '@studdy-buddy/shared/src/types/api';

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

export { userRouter };
