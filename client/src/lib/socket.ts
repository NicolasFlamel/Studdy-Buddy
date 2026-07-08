import { io, Socket } from 'socket.io-client';
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from '@studdy-buddy/shared/types/socket';

export type ClientSocketType = Socket<
  ServerToClientEvents,
  ClientToServerEvents
>;
export const socket: ClientSocketType = io({
  autoConnect: false,
});
