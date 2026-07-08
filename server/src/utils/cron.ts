import { deleteChatByUserId, removeClaimsByUserId } from '@/db/queries/chats';
import { logger } from './logger';

const pendingDeletions = new Map<string, NodeJS.Timeout>();
const pendingLeaves = new Map<string, NodeJS.Timeout>();

const DELETE_GRACE_PERIOD = 5 * 1000;
const LEAVE_GRACE_PERIOD = 200;

export const handleRemoveChats = async (userId: string) => {
  try {
    logger.info({ userId }, 'Removing chats for userId' + userId);
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
  }, DELETE_GRACE_PERIOD);

  pendingDeletions.set(chatId, timer);
};

export const cancelChatDeletion = (chatId: string) => {
  if (pendingDeletions.has(chatId)) {
    logger.info({ chatId }, 'Deletion cancelled.');
    clearTimeout(pendingDeletions.get(chatId));
    pendingDeletions.delete(chatId);
  }
};

export const queueRoomLeave = (
  socketId: string,
  chatId: string,
  onLeave: () => void,
) => {
  const key = `${socketId}:${chatId}`;
  const timer = setTimeout(() => {
    onLeave();
    pendingLeaves.delete(key);
  }, LEAVE_GRACE_PERIOD);
  pendingLeaves.set(key, timer);
};

export const cancelRoomLeave = (socketId: string, chatId: string) => {
  const key = `${socketId}:${chatId}`;
  if (pendingLeaves.has(key)) {
    logger.info({ socketId, chatId }, 'Room leave cancelled.');
    clearTimeout(pendingLeaves.get(key));
    pendingLeaves.delete(key);
    return true;
  }
  return false;
};

export const flushRoomLeaves = (socketId: string) => {
  for (const [key, timer] of pendingLeaves) {
    if (key.startsWith(`${socketId}:`)) {
      clearTimeout(timer);
      pendingLeaves.delete(key);
    }
  }
};
