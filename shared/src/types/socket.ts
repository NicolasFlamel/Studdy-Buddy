type UserIdType = string;
type ChatIdType = string;

export type ServerToClientEvents = {
  userJoined: (data: { username: string; id: UserIdType }) => void;
  newMessage: (data: MessagePayloadServer) => void;
  userLeft: (data: { userId: UserIdType; username: string }) => void;
  error: (data: { message: string; code?: string }) => void;
};

export type JoinRoomDataType = { chatId: ChatIdType };
export type SendMessageDataType = ClientMessagePayload;
export type LeaveRoomDataType = { chatId: ChatIdType };

export type ClientToServerEvents = {
  joinRoom: (data: JoinRoomDataType) => Promise<void>;
  sendMessage: (data: SendMessageDataType) => Promise<void>;
  leaveRoom: (data: LeaveRoomDataType) => Promise<void>;
};

export interface InterServerEvents {}

export type SocketData =
  | {
      username: string;
      userId: UserIdType;
      chatId?: never;
      isChatOwner?: never;
      isJoining?: boolean;
    }
  | {
      username: string;
      userId: UserIdType;
      chatId: ChatIdType;
      isChatOwner: boolean;
      isJoining?: boolean;
    };

export type ClientMessagePayload = {
  text: string;
  timestamp: string;
};

export type UserMessageType = {
  type: 'user';
  id: string;
  userId: UserIdType;
  username: string;
  text: string;
  timestamp: string;
};
export type SystemMessageType = {
  type: 'system';
  id: string;
  text: string;
  timestamp: string;
};
export type MessagePayloadServer = UserMessageType | SystemMessageType;
export type SocketDataWithChat = Extract<SocketData, { chatId: ChatIdType }>;

export type ErrorCodes = 'CHAT_ID_REQUIRED';

// export type UserPayload = {
//   userId: string;
//   username: string;
//   roomId: string;
// };
