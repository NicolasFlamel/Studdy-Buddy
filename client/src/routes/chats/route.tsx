import { SocketProvider } from '@/context/socket-provider';
import { createFileRoute, Outlet } from '@tanstack/react-router';

const ChatLayout = () => {
  return (
    <SocketProvider>
      <Outlet />
    </SocketProvider>
  );
};

export const Route = createFileRoute('/chats')({
  component: ChatLayout,
});
