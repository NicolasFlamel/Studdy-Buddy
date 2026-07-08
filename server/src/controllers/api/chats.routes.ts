import { z } from 'zod';
import { db } from '@/db';
import { Request, Response, Router } from 'express';
import { withAuth } from '@/utils/auth';
import { reply } from '@/utils/helpers';
import { getUserScoreBySubject } from '@/db/queries/scores';
import { claimChat, upsertChat } from '@/db/queries/chats';
import { GetChatMetadataSchema, SubjectEnumSchema } from '@shared/schemas';
import {
  ApiResult,
  GetChatMetadataData,
  MatchPostChatsData,
  PostChatsData,
} from '@shared/types/api';

export const chatRouter = Router();

type GetResType = Response<ApiResult<GetChatMetadataData>>;
chatRouter.get(
  '/:chatId/metadata',
  withAuth,
  async (req: Request, res: GetResType) => {
    const { userId } = req.session;
    const { chatId } = req.params;

    if (!userId) {
      req.log.error({ userId }, 'UserId empty after passing withAuth');
      return res.status(500).json(reply(null, 'Something went wrong.'));
    } else if (!chatId) {
      req.log.warn({ userId }, 'Missing chatId.');
      return res.status(400).json(reply(null, 'Missing chatId.'));
    }

    try {
      const chatData = await db.query.chats.findFirst({
        where: { id: chatId },
        with: {
          host: { columns: { id: true, username: true } },
          claimingUser: { columns: { id: true, username: true } },
          hostScore: { columns: { id: true, subject: true } },
        },
      });

      if (!chatData) {
        req.log.warn({ userId, chatId }, 'Chat not found.');
        return res.status(404).json(reply(null, 'Chat not found.'));
      }

      const data = GetChatMetadataSchema.parse({
        id: chatData.id,
        subject: chatData.hostScore?.subject,
        host: chatData.host ?? undefined,
        claimer: chatData.claimingUser ?? null,
      });

      return res.status(200).json(reply(data));
    } catch (error) {
      req.log.error({ error, userId });
      return res.status(500).json(reply(null, 'Something went wrong.'));
    }
  },
);

type PostResType = Response<ApiResult<PostChatsData>>;
chatRouter.post('/', withAuth, async (req: Request, res: PostResType) => {
  const { userId } = req.session;
  const subjectParse = SubjectEnumSchema.safeParse(req.body?.subject);

  if (!userId) {
    req.log.error({ userId }, 'UserId empty after passing withAuth');
    return res.status(500).json(reply(null, 'Something went wrong.'));
  } else if (!subjectParse.success) {
    req.log.warn(
      { userId, zodError: z.prettifyError(subjectParse.error) },
      'Parse failed for subject',
    );

    return res.status(400).json(reply(null, 'Invalid data'));
  }

  try {
    const subject = subjectParse.data;
    const score = await getUserScoreBySubject({
      userId,
      subject,
    });

    if (!score) {
      req.log.error({ userId, subject });
      throw new Error('Missing scores for user');
    }

    const chatData = await upsertChat({
      userId,
      scoreId: score.id,
    });

    return res.status(200).json(reply(chatData));
  } catch (error) {
    req.log.error({ error, userId });
    return res.status(500).json(reply(null, 'Something went wrong.'));
  }
});

type MatchPostResType = Response<ApiResult<MatchPostChatsData>>;
chatRouter.post(
  '/match',
  withAuth,
  async (req: Request, res: MatchPostResType) => {
    const { userId } = req.session;

    if (!userId) throw new Error('Missing userId after withAuth');

    try {
      // TODO: validate not in another chat first
      const chatDataArr = await claimChat(userId);

      if (!chatDataArr) {
        return res.status(204).json(reply(null, 'No chats found'));
      }

      res.status(200).json(reply({ id: chatDataArr.chatId }));
    } catch (error) {
      req.log.error({ error, userId });
      res.status(500).json(reply(null, 'Something went wrong.'));
    }
  },
);
