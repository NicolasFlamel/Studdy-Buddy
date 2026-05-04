import { db } from '../index';
import { and, eq, gte, inArray, isNull, not } from 'drizzle-orm';
import { chats, scores } from '../schema';
import { UserIdType } from '@/types';
import { alias } from 'drizzle-orm/pg-core';

export const getChatById = (id: (typeof chats.$inferSelect)['id']) => {
  return db.query.chats.findFirst({ where: { id } });
};

export const updateChatById = async (
  chatId: (typeof chats.$inferSelect)['id'],
  data: Partial<Omit<typeof chats.$inferSelect, 'id' | 'userId'>>,
) => {
  const [chatData] = await db
    .update(chats)
    .set(data)
    .where(eq(chats.id, chatId))
    .returning({ id: chats.id });

  if (!chatData) throw new Error('Could not update chat');

  return chatData;
};

export const upsertChat = async (data: typeof chats.$inferInsert) => {
  const [chatData] = await db
    .insert(chats)
    .values(data)
    .onConflictDoUpdate({ target: chats.userId, set: data })
    .returning({ id: chats.id });

  if (!chatData) throw new Error('Could not create chat');

  return chatData;
};

export const removeClaimsByUserId = (
  userId: (typeof chats.$inferSelect)['userId'],
) => {
  return db
    .update(chats)
    .set({ claimedByUserId: null })
    .where(eq(chats.claimedByUserId, userId));
};

export const deleteChatById = (chatId: (typeof chats.$inferSelect)['id']) => {
  return db.delete(chats).where(eq(chats.id, chatId));
};

export const deleteChatByUserId = (
  userId: (typeof chats.$inferSelect)['userId'],
) => {
  return db.delete(chats).where(eq(chats.userId, userId));
};

const chatScores = alias(scores, 'chatScore');
const userScores = alias(scores, 'userScore');
export const findExistingClaims = (searcherUserId: UserIdType) => {
  return db
    .select({ chatId: chats.id, chatUser: chats.userId })
    .from(chats)
    .where(eq(chats.claimedByUserId, searcherUserId));
};
export const searchForOpenChats = (searcherUserId: UserIdType) => {
  return db
    .select({ chatId: chats.id })
    .from(chats)
    .innerJoin(chatScores, eq(chats.scoreId, chatScores.id))
    .innerJoin(
      userScores,
      and(
        eq(userScores.subject, chatScores.subject),
        eq(userScores.userId, searcherUserId),
      ),
    )
    .where(
      and(
        isNull(chats.claimedByUserId),
        not(eq(chats.userId, searcherUserId)),
        gte(userScores.rating, chatScores.rating),
      ),
    );
};

export const claimChat = async (searcherUserId: UserIdType) => {
  const existingClaim = await findExistingClaims(searcherUserId).limit(1);

  if (existingClaim[0]) return existingClaim[0];

  try {
    const matchingChat = searchForOpenChats(searcherUserId).limit(1);
    const result = await db
      .update(chats)
      .set({ claimedByUserId: searcherUserId })
      .where(inArray(chats.id, matchingChat))
      .returning({ chatId: chats.id, chatUser: chats.userId });

    return result[0] ?? null;
  } catch (err) {
    if ((err as { code?: string })?.code === '23505') {
      const existingClaim = await findExistingClaims(searcherUserId).limit(1);
      return existingClaim[0] ?? null;
    }

    throw err;
  }
};
