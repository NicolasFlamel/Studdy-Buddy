import { ChatHeader } from './chat-header';
import { ChatWindow } from './chat-window';

interface ChatProps {
  subject: string;
}
export const Chat = ({ subject }: ChatProps) => {
  return (
    <main
      className={
        'fill-screen grow overflow-hidden p-4 container mx-auto flex flex-col gap-8'
      }
    >
      {/* <UserSearchingModal />
        <UserFoundModal /> */}
      <ChatHeader subject={subject} />
      <ChatWindow />
    </main>
  );
};
