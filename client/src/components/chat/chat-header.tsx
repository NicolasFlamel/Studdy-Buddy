import { useChat } from '@/context/chat-provider';
import { Link } from '@tanstack/react-router';
import type { ReactNode } from 'react';

interface Props {
  subject: string;
}
export const ChatHeader = ({ subject }: Props) => {
  const { connectedUser } = useChat();

  return (
    <section
      className={
        'flex flex-col gap-2 p-4 border border-border rounded-md text-center'
      }
    >
      <h2>
        {'Studdy Buddy Subject: '}
        <span className={'bg-secondary rounded-md p-1'}>{subject}</span>
      </h2>
      <p className={'text-muted-foreground'}>
        {'Connected Buddy: '}
        {connectedUser && (
          <UserLink userId={connectedUser.id}>
            {connectedUser.username}
          </UserLink>
        )}
      </p>
    </section>
  );
};

type UserLinkProps = {
  userId: string;
  children: ReactNode;
};
const UserLink = ({ userId, children }: UserLinkProps) => {
  return (
    <Link
      to={'/profiles/$userId'}
      params={{ userId }}
      target="_blank"
      className={'text-blue-600 hover:text-blue-700 underline'}
    >
      {children}
    </Link>
  );
};
