import type {
  ClientMessagePayload,
  MessagePayloadServer,
  ServerToClientEvents,
} from '@studdy-buddy/shared/types/socket';
import { createContext, useContext, useEffect, useState } from 'react';
import { useSocket } from './socket-provider';
import type { UserType } from '@/components/chat/types';

type ConnectedUserType = UserType | null;
interface ChatContextType {
  isConnected: boolean;
  messages: MessagePayloadServer[];
  sendMessage: (message: string) => Promise<void>;
  connectedUser: ConnectedUserType;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
  children: React.ReactNode;
  chatId: string;
  initialConnectedUser: ConnectedUserType | undefined;
}
export function ChatProvider({
  children,
  chatId,
  initialConnectedUser = null,
}: ChatProviderProps) {
  const socket = useSocket();
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [connectedUser, setConnectedUser] =
    useState<ConnectedUserType>(initialConnectedUser);
  const [messages, setMessages] = useState<MessagePayloadServer[]>([]);

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
      socket.emit('joinRoom', { chatId });
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    const onChatMessage: ServerToClientEvents['newMessage'] = (
      value: (typeof messages)[number],
    ) => {
      setMessages((previous) => [...previous, value]);
    };

    const onUserJoined: ServerToClientEvents['userJoined'] = (user) => {
      setConnectedUser(user);
    };

    const onUserLeft: ServerToClientEvents['userLeft'] = () => {
      setConnectedUser(null);
    };

    socket.emit('joinRoom', { chatId });

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('newMessage', onChatMessage);
    socket.on('userJoined', onUserJoined);
    socket.on('userLeft', onUserLeft);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('newMessage', onChatMessage);

      socket.emit('leaveRoom', { chatId });
    };
  }, [chatId, socket]);

  const sendMessage = async (message: string) => {
    const data: ClientMessagePayload = {
      text: message,
      timestamp: new Date().toISOString(),
    };
    socket.emit('sendMessage', data);
  };

  const value: ChatContextType = {
    isConnected,
    messages,
    sendMessage,
    connectedUser,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
