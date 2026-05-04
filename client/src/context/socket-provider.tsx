import { socket } from '@/lib/socket';
import { createContext, useContext, useEffect } from 'react';
import type { Socket } from 'socket.io-client';
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from '@studdy-buddy/shared/types/socket';

type SocketType = Socket<ServerToClientEvents, ClientToServerEvents>;

const SocketContext = createContext<SocketType>(socket);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSocket = () => useContext(SocketContext);
