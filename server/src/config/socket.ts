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
  JoinRoomDataType,
  LeaveRoomDataType,
  MessagePayloadServer,
  SendMessageDataType,
  ServerToClientEvents,
  SocketData,
  SocketDataWithChat,
} from '@shared/index';
import {
  cancelChatDeletion,
  cancelRoomLeave,
  flushRoomLeaves,
  handleRemoveChats,
  queueChatDeletion,
  queueRoomLeave,
} from '@/utils/cron';

type DefaultSocketType = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;
type CustomSocketType = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketDataWithChat
>;
type IOServerType = SocketServer<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;
type SocketMiddleware = Parameters<DefaultSocketType['use']>[0];

type ClientEventNames = keyof ClientToServerEvents;
const REQUIRE_CHAT_ID = new Set<string>([
  'sendMessage',
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

    socket.use(socketEventMiddleware({ io, socket }));

    socket.on('joinRoom', socketOnJoinRoom({ io, socket }));
    socket.on('sendMessage', socketOnSendMessage({ io, socket }));
    socket.on('leaveRoom', socketOnLeaveRoom({ io, socket }));
    socket.on('disconnect', socketOnDisconnect({ io, socket }));
  });
};

const ioAuthMiddleware = async (
  socket: DefaultSocketType,
  next: (err?: ExtendedError) => void,
) => {
  const userId = socket.request.session.userId;

  if (!userId) {
    const data = { socketId: socket.id, sessionId: socket.request.session?.id };
    logger.error(data, 'ioAuthMiddleware: userId should be in socket');
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
    logger.error(error, 'ioAuthMiddleware: caught error');
    return next(new Error('Something went wrong.'));
  }
};

function requireChatId(
  socket: DefaultSocketType,
): asserts socket is CustomSocketType {
  if (!socket.data.chatId) throw new Error('chatId not set');
}

const socketEventMiddleware = ({ socket }: SocketAndIo) =>
  (([event, ..._args], next) => {
    if (REQUIRE_CHAT_ID.has(event) && !socket.data.chatId) {
      logger.warn(
        { event, socketId: socket.id },
        'socketEventMiddleware: chatId not set yet',
      );

      socket.emit('error', {
        message: `chatId required for: ${event}`,
        code: 'CHAT_ID_REQUIRED',
      });

      return next(new Error(`chatId required for: ${event}`));
    }

    next();
  }) satisfies SocketMiddleware;

type SocketAndIo = {
  io: IOServerType;
  socket: DefaultSocketType;
};
const socketOnJoinRoom =
  ({ io, socket }: SocketAndIo) =>
  async ({ chatId }: JoinRoomDataType) => {
    const { userId, username } = socket.data;

    const wasLeaving = cancelRoomLeave(socket.id, chatId);
    cancelChatDeletion(chatId);

    if (wasLeaving) return;
    else if (socket.data.chatId === chatId) return;
    else if (socket.data.isJoining) return;

    socket.data.isJoining = true;

    try {
      const chat = await getChatById(chatId);

      if (!chat) {
        logger.error(
          { userId, chatId },
          'socketOnJoinRoom: No chat found with id',
        );
        socket.emit('error', {
          message: 'No chat found.',
          code: 'CHAT_NOT_FOUND',
        });
        return;
      }

      socket.data.chatId = chatId;
      socket.data.isChatOwner = chat.userId === userId;

      await socket.join(chatId);
      socket.broadcast.to(chatId).emit('userJoined', { id: userId, username });

      const dataSent: MessagePayloadServer = {
        type: 'system',
        id: randomUUID(),
        text: 'User ' + username + ' has joined the chat.',
        timestamp: new Date().toISOString(),
      };

      io.to(chatId).emit('newMessage', dataSent);

      logger.info(
        { socketData: socket.data, userId, chatId },
        'User joined room',
      );
    } catch (error) {
      logger.error({ error, chatId }, 'socketOnJoinRoom: Failed to fetch chat');
      socket.emit('error', {
        message: 'Something went wrong.',
        code: 'DB_ERROR',
      });
    } finally {
      socket.data.isJoining = false;
    }
  };

const socketOnSendMessage =
  ({ io, socket }: SocketAndIo) =>
  async (dataReceived: SendMessageDataType) => {
    requireChatId(socket);
    const { chatId } = socket.data;
    logger.info(socket.data, 'user chatMessage');

    const dataSent: MessagePayloadServer = {
      type: 'user',
      id: randomUUID(),
      text: dataReceived.text,
      timestamp: dataReceived.timestamp,
      userId: socket.data.userId,
      username: socket.data.username,
    };
    io.to(chatId).emit('newMessage', dataSent);
  };

const socketOnLeaveRoom =
  ({ io, socket }: SocketAndIo) =>
  async ({ chatId }: LeaveRoomDataType) => {
    const { userId, username } = socket.data;

    queueRoomLeave(socket.id, chatId, async () => {
      if (socket.data.chatId !== chatId) return;
      logger.info({ userId, chatId }, 'User leaving room');

      const dataSent: MessagePayloadServer = {
        type: 'system',
        id: randomUUID(),
        text: 'User ' + username + ' has left the chat.',
        timestamp: new Date().toISOString(),
      };

      await socket.leave(chatId);

      io.to(chatId).emit('newMessage', dataSent);
      socket.broadcast.to(chatId).emit('userLeft', { userId, username });
    });
  };

const socketOnDisconnect =
  ({ io, socket }: SocketAndIo) =>
  async () => {
    const { userId, username, chatId } = socket.data;
    logger.info({ socket: socket.data, userId }, 'User disconnected');

    flushRoomLeaves(socket.id);

    if (!chatId) {
      await handleRemoveChats(userId);
      return;
    }

    const dataSent: MessagePayloadServer = {
      type: 'system',
      id: randomUUID(),
      text: 'User ' + username + ' has disconnected from the chat.',
      timestamp: new Date().toISOString(),
    };

    await socket.leave(chatId);
    io.to(chatId).emit('newMessage', dataSent);

    queueChatDeletion(chatId, userId);

    socket.broadcast.to(chatId).emit('userLeft', { userId, username });
  };
