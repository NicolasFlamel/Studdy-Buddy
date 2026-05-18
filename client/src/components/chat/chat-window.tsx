import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';
import { useChat } from '@/context/chat-provider';
import { useAuth } from '@/hooks/use-auth';
import { ChatInput } from './input';
import type {
  SystemMessageType,
  UserMessageType,
} from '@studdy-buddy/shared/types/socket';

export const ChatWindow = () => {
  return (
    <section className={'grow overflow-hidden flex flex-col gap-8'}>
      <Messages />
      <ChatInput />
    </section>
  );
};

const Messages = () => {
  const { user } = useAuth();
  const { messages } = useChat();
  const ulRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!ulRef.current) return;

    ulRef.current.scrollTo({ top: ulRef.current.scrollHeight });
  }, [messages]);

  if (!user) throw new Error('User data should be present.');

  return (
    <ul
      ref={ulRef}
      className={'grow flex flex-col gap-8 px-4 max-h-screen overflow-auto'}
    >
      {messages.map((message) =>
        message.type === 'system' ? (
          <SystemMessage key={message.id} message={message} />
        ) : (
          <UserMessage key={message.id} message={message} userId={user.id} />
        ),
      )}
    </ul>
  );
};

type UserMessageProps = {
  userId: string;
  message: UserMessageType;
};
const UserMessage = ({ userId, message }: UserMessageProps) => {
  const isSelf = userId === message.userId;

  return (
    <li
      className={cn(
        'flex flex-col max-w-3/4 gap-1',
        isSelf ? 'ml-auto' : 'mr-auto',
      )}
    >
      <section
        className={cn('flex gap-2 text-sm', isSelf ? 'ml-auto' : 'mr-auto')}
      >
        <strong>{message.username}</strong>
        <Timestamp timestamp={message.timestamp} />
      </section>
      <p
        className={cn(
          'p-4 shadow-sm rounded-md',
          isSelf
            ? 'bg-primary text-primary-foreground rounded-tr-none ml-auto'
            : 'bg-secondary text-secondary-foreground rounded-tl-none mr-auto',
        )}
      >
        {message.text}
      </p>
    </li>
  );
};

type SystemMessageProps = { message: SystemMessageType };
const SystemMessage = ({ message }: SystemMessageProps) => {
  return (
    <li className={'flex flex-col text-center'}>
      <section className={'flex gap-2 text-center text-sm m-auto'}>
        <strong>SYSTEM</strong>
        <Timestamp timestamp={message.timestamp} />
      </section>
      <p className={'text-muted-foreground'}>{message.text}</p>
    </li>
  );
};

const Timestamp = ({ timestamp }: { timestamp: string }) => {
  const formatTimestamp = (rawTimestamp: string) => {
    return format(parseISO(rawTimestamp), 'hh:mm a');
  };

  return (
    <time dateTime={timestamp} className={'text-sm text-muted-foreground'}>
      {formatTimestamp(timestamp)}
    </time>
  );
};
