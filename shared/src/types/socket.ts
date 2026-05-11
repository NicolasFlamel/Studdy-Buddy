type UserIdType = string;
type ChatIdType = string;

export type ServerToClientEvents = {
  userJoined: (data: { username: string; id: UserIdType }) => void;
  newMessage: (data: MessagePayloadServer) => void;
  userLeft: (data: { userId: UserIdType; username: string }) => void;
  error: (data: { message: string; code?: string }) => void;
};

export type ClientToServerEvents = {
  joinRoom: (data: { chatId: ChatIdType }) => Promise<void>;
  sendMessage: (data: ClientMessagePayload) => Promise<void>;
  leaveRoom: (data: { chatId: ChatIdType }) => Promise<void>;
};

export interface InterServerEvents {}

export type SocketData =
  | {
      username: string;
      userId: UserIdType;
      chatId?: never;
      isChatOwner?: never;
    }
  | {
      username: string;
      userId: UserIdType;
      chatId: ChatIdType;
      isChatOwner: boolean;
    };

export type ClientMessagePayload = {
  text: string;
  timestamp: string;
};

export type MessagePayloadServer = {
  id: string;
  userId: UserIdType;
  username: string;
  text: string;
  timestamp: string;
};

export type SocketDataWithChat = Extract<SocketData, { chatId: ChatIdType }>;

// export type UserPayload = {
//   userId: string;
//   username: string;
//   roomId: string;
// };
