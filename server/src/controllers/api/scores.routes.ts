import { z } from 'zod';
import { Request, Response, Router } from 'express';
import { withAuth } from '@/utils/auth';
import { reply } from '@/utils/helpers';
import { getScoresByUserId, upsertScoreByUserId } from '@/db/queries/scores';
import { ApiResult, GetScoresData, PostScoresData } from '@shared/types/api';
import {
  CreateScoresSchema,
  ScoresForm,
  ScoresSchema,
  SUBJECTS,
} from '@shared/schemas';

export const scoreRouter = Router();

type GetResType = Response<ApiResult<GetScoresData>>;
scoreRouter.get('/', withAuth, async (req: Request, res: GetResType) => {
  const { userId } = req.session;

  if (!userId) {
    req.log.error('No userId in withAuth route.');
    return res.status(401).json(reply(null, 'You are not logged in.'));
  }

  try {
    const scores = await getScoresByUserId(userId);
    const parse = ScoresSchema.array().length(5).safeParse(scores);

    if (!parse.success) {
      const zodError = z.flattenError(parse.error).fieldErrors;
      req.log.error({ userId, scores, zodError }, 'Failed parse of scores');
      return res.status(500).json(reply(null, 'Missing scores'));
    }

    return res.status(200).json(reply(parse.data));
  } catch (error) {
    req.log.error(error);
    return res.status(500).json(reply(null, 'Something went wrong.'));
  }
});

type PostResType = Response<ApiResult<PostScoresData>>;
scoreRouter.post('/', withAuth, async (req: Request, res: PostResType) => {
  const { userId } = req.session;

  try {
    const formParse = ScoresForm.safeParse(req.body);

    if (!formParse.success) {
      const zodError = z.flattenError(formParse.error).fieldErrors;
      req.log.warn({ userId, zodError }, 'Incorrect form data');
      return res.status(400).json(reply(null, formParse.error.message));
    }

    const data = SUBJECTS.map((subject) => ({
      userId,
      subject,
      rating: formParse.data[subject],
    }));
    const parse = CreateScoresSchema.array().parse(data);

    await upsertScoreByUserId(parse);

    return res.status(200).json(reply(parse));
  } catch (error) {
    req.log.error(error);
    return res.status(500).json(reply(null, 'Something went wrong.'));
  }
});
