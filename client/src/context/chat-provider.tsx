import type {
  ClientMessagePayload,
  MessagePayloadServer,
} from '@studdy-buddy/shared/types/socket';
import { createContext, useContext, useEffect, useState } from 'react';
import { useSocket } from './socket-provider';

interface ChatContextType {
  isConnected: boolean;
  messages: MessagePayloadServer[];
  sendMessage: (message: string) => Promise<void>;
  connectedUsername: string;
  updateConnectedUsername: (newUsername: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({
  children,
  chatId,
}: {
  children: React.ReactNode;
  chatId: string;
}) {
  const socket = useSocket();
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [connectedUsername, setConnectedUsername] = useState('');
  const [messages, setMessages] = useState<MessagePayloadServer[]>([]);

  useEffect(() => {
    socket.emit('joinRoom', { chatId });

    const onConnect = () => {
      setIsConnected(true);
      socket.emit('joinRoom', { chatId });
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.emit('leaveRoom', { chatId });
    };
  }, [chatId, socket]);

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    const onChatMessage = (value: (typeof messages)[number]) => {
      setMessages((previous) => [...previous, value]);
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('newMessage', onChatMessage);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('newMessage', onChatMessage);
    };
  }, [chatId, socket]);

  const sendMessage = async (message: string) => {
    const data: ClientMessagePayload = {
      text: message,
      timestamp: new Date().toISOString(),
    };
    socket.emit('sendMessage', data);
  };

  const updateConnectedUsername = (newUsername: string) => {
    setConnectedUsername(newUsername);
  };

  const value: ChatContextType = {
    isConnected,
    messages,
    sendMessage,
    connectedUsername,
    updateConnectedUsername,
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
