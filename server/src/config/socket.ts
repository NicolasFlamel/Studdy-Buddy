import { randomUUID } from 'crypto';
import { logger } from '@/utils/logger';
import { sessionMiddleware } from './session';
import { getChatById } from '@/db/queries/chats';
import { getUserByIdPublic } from '@/db/queries/users';
import type { Server as HttpServerType } from 'http';
import { ExtendedError, Socket, Server as SocketServer } from 'socket.io';
import {
  ClientToServerEvents,
  InterServerEvents,
  MessagePayloadServer,
  ServerToClientEvents,
  SocketData,
  SocketDataWithChat,
} from '@shared/index';
import {
  cancelChatDeletion,
  handleRemoveChats,
  queueChatDeletion,
} from '@/utils/cron';

type AppSocketType = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;
type ClientEventNames = keyof ClientToServerEvents;
const REQUIRE_CHAT_ID = new Set<string>([
  'sendMessage',
  'leaveRoom',
] satisfies ClientEventNames[]);

export const initSocket = (httpServer: HttpServerType) => {
  const io = new SocketServer<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >(httpServer);

  io.engine.use(sessionMiddleware);
  io.use(ioAuthMiddleware);

  io.on('connection', function (socket) {
    logger.info(socket.data, 'user connected');
    // socket middleware
    socket.use(([event, ..._args], next) => {
      if (REQUIRE_CHAT_ID.has(event) && !socket.data.chatId) {
        logger.warn({ event, socketId: socket.id }, 'chatId not set yet');
        return next(new Error(`chatId required for: ${event}`));
      }

      next();
    });

    socket.on('joinRoom', async ({ chatId }) => {
      const { userId, username } = socket.data;

      cancelChatDeletion(chatId);

      try {
        const chat = await getChatById(chatId);

        if (!chat) {
          logger.error({ userId, chatId }, 'No chat found with id');
          socket.emit('error', {
            message: 'No chat found.',
            code: 'CHAT_NOT_FOUND',
          });
          return;
        }

        socket.data.chatId = chatId;
        socket.data.isChatOwner = chat.userId === userId;

        await socket.join(chatId);
        socket.broadcast
          .to(chatId)
          .emit('userJoined', { id: userId, username });

        logger.info(
          { socketData: socket.data, userId, chatId },
          'User joined room',
        );
      } catch (error) {
        logger.error({ error, chatId }, 'Failed to fetch chat');
        socket.emit('error', {
          message: 'Something went wrong.',
          code: 'DB_ERROR',
        });
      }
    });

    socket.on('sendMessage', async (dataReceived) => {
      requireChatId(socket);
      const { chatId } = socket.data;
      logger.info(socket.data, 'user chatMessage');

      const dataSent: MessagePayloadServer = {
        id: randomUUID(),
        text: dataReceived.text,
        timestamp: dataReceived.timestamp,
        userId: socket.data.userId,
        username: socket.data.username,
      };
      io.to(chatId).emit('newMessage', dataSent);
    });

    socket.on('leaveRoom', async () => {
      const { userId, username, chatId } = socket.data;
      logger.info({ userId, chatId }, 'User leaving room');

      if (!chatId) return;

      socket.broadcast.to(chatId).emit('userLeft', { userId, username });
    });

    socket.on('disconnect', async () => {
      const { userId, username, chatId } = socket.data;
      logger.info({ socket: socket.data, userId }, 'User disconnected');

      if (!chatId) {
        logger.debug('test');
        await handleRemoveChats(userId);
        return;
      }

      queueChatDeletion(chatId, userId);

      socket.broadcast.to(chatId).emit('userLeft', { userId, username });
    });
  });
};

const ioAuthMiddleware = async (
  socket: AppSocketType,
  next: (err?: ExtendedError) => void,
) => {
  const userId = socket.request.session.userId;

  if (!userId) {
    const data = { socketId: socket.id, sessionId: socket.request.session?.id };
    logger.error(data, 'userId should be in socket');
    return next(new Error('userId should be in socket'));
  }

  try {
    const response = await getUserByIdPublic(userId);

    if (!response) {
      const data = {
        userId,
        response,
        request: socket.request,
      };
      logger.warn(data, 'request rejected');
      return next(new Error('Missing auth'));
    }

    socket.data.userId = response.id;
    socket.data.username = response.username;

    return next();
  } catch (error) {
    logger.error(error, 'caught error in io.use');
    return next(new Error('Something went wrong.'));
  }
};

function requireChatId(
  socket: AppSocketType,
): asserts socket is Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketDataWithChat
> {
  if (!socket.data.chatId) throw new Error('chatId not set');
}
