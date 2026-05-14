import { useChat } from '@/context/chat-provider';
import { Link } from '@tanstack/react-router';
import type { ReactNode } from 'react';

interface Props {
  subject: string;
}
export const ChatHeader = ({ subject }: Props) => {
  const { connectedUser } = useChat();

  return (
    <section className={'bg-card rounded-md shadow-md text-center p-8'}>
      <h2>
        {'Currently Connected Buddy: '}
        {connectedUser && (
          <UserLink userId={connectedUser.id}>
            {connectedUser.username}
          </UserLink>
        )}
      </h2>
      <h2>{`Studdy Buddy Subject: ${subject}`}</h2>
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
