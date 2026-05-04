import dayjs from 'dayjs';
import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';
import { useChat } from '@/context/chat-provider';
import { useAuth } from '@/hooks/use-auth';
import { ChatInput } from './input';

export const ChatWindow = () => {
  return (
    <section className={'grow overflow-hidden flex flex-col gap-8 p-4'}>
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

  const formatTimestamp = (rawTimestamp: string) => {
    const day = dayjs(rawTimestamp);
    const formattedDay = day.format('hh:mm a');

    return formattedDay;
  };

  return (
    <ul
      ref={ulRef}
      className={'grow p-8 flex flex-col gap-8 max-h-screen overflow-auto'}
    >
      {messages.map((message) => {
        const isSelf = user.id === message.userId;

        return (
          <li
            key={message.id}
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
            <time dateTime={message.timestamp} className={'text-sm'}>
              {formatTimestamp(message.timestamp)}
            </time>
          </li>
        );
      })}
    </ul>
  );
};
