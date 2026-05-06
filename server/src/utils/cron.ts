import { deleteChatByUserId, removeClaimsByUserId } from '@/db/queries/chats';
import { logger } from './logger';

const pendingDeletions = new Map<string, NodeJS.Timeout>();
const GRACE_PERIOD = 10 * 1000;

export const handleRemoveChats = async (userId: string) => {
  try {
    logger.info({ userId }, 'Removing chats for ' + userId);
    await Promise.all([
      removeClaimsByUserId(userId),
      deleteChatByUserId(userId),
    ]);
  } catch (error) {
    logger.error({ error, userId }, "Couldn't delete chat");
  }
};

export const queueChatDeletion = (chatId: string, userId: string) => {
  const timer = setTimeout(async () => {
    await handleRemoveChats(userId);
    pendingDeletions.delete(userId);
  }, GRACE_PERIOD);

  pendingDeletions.set(chatId, timer);
};

export const cancelChatDeletion = (chatId: string) => {
  if (pendingDeletions.has(chatId)) {
    logger.info({ chatId }, 'Deletion cancelled.');
    clearTimeout(pendingDeletions.get(chatId));
    pendingDeletions.delete(chatId);
  }
};
