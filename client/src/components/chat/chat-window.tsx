import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';
import { useEffect, useRef, type ReactNode } from 'react';
import { useChat } from '@/context/chat-provider';
import { useAuth } from '@/hooks/use-auth';
import { ChatInput } from './input';
import type {
  MessagePayloadServer,
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
          <SystemMessage key={message.id} message={message}>
            <Timestamp timestamp={message.timestamp} />
          </SystemMessage>
        ) : (
          <UserMessage key={message.id} message={message} userId={user.id}>
            <Timestamp timestamp={message.timestamp} />
          </UserMessage>
        ),
      )}
    </ul>
  );
};

type UserMessageProps = {
  userId: string;
  message: UserMessageType;
  children: ReactNode;
};
const UserMessage = ({ userId, message, children }: UserMessageProps) => {
  const isSelf = userId === message.userId;

  return (
    <li
      className={cn(
        'flex flex-col max-w-3/4',
        isSelf ? 'ml-auto *:ml-auto' : 'mr-auto',
      )}
    >
      <strong>{message.username}</strong>
      <p
        className={cn(
          'p-4 rounded-md shadow-sm',
          isSelf
            ? 'bg-card text-card-foreground'
            : 'bg-accent text-accent-foreground',
        )}
      >
        {message.text}
      </p>
      {children}
    </li>
  );
};

type SystemMessageProps = { message: SystemMessageType; children: ReactNode };
const SystemMessage = ({ message, children }: SystemMessageProps) => {
  return (
    <li className={'flex flex-col text-center'}>
      <strong className={'text-accent-foreground'}>SYSTEM</strong>
      <p
        className={'p-4 rounded-md shadow-sm bg-accent text-accent-foreground'}
      >
        {message.text}
      </p>
      {children}
    </li>
  );
};

type TimestampProps = {
  timestamp: MessagePayloadServer['timestamp'];
};
const Timestamp = ({ timestamp }: TimestampProps) => {
  const formatTimestamp = (rawTimestamp: string) => {
    return format(parseISO(rawTimestamp), 'hh:mm a');
  };

  return (
    <time dateTime={timestamp} className={'text-sm'}>
      {formatTimestamp(timestamp)}
    </time>
  );
};
