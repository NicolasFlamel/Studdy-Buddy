import { useChat } from '@/context/chat-provider';
import { Button } from '../ui/button';
import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChatFormSchema, type ChatFormSchemaType } from '@/schemas/forms';
import { Field, FieldLabel } from '../ui/field';
import { Textarea } from '../ui/textarea';
import { useEffect, useRef } from 'react';

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
      className={'grow p-8 flex flex-col gap-8 max-h-screen overflow-auto'}
    >
      {messages.map((message) => {
        return (
          <li
            key={message.id}
            className={cn(
              'p-4 max-w-3/4 rounded-sm',
              user.id === message.userId
                ? 'ml-auto bg-card text-card-foreground text-right'
                : 'mr-auto bg-accent text-accent-foreground',
            )}
          >
            <strong>{message.username}</strong>
            <p>{message.text}</p>
          </li>
        );
      })}
    </ul>
  );
};

const ChatInput = () => {
  const { sendMessage } = useChat();
  const form = useForm({
    resolver: zodResolver(ChatFormSchema),
    defaultValues: { message: '' },
  });

  const onSubmit: SubmitHandler<ChatFormSchemaType> = async (values) => {
    await sendMessage(values.message);
    form.reset();
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={
        'flex gap-4 items-end bg-card border border-input shadow-xs rounded-2xl p-4'
      }
    >
      <Controller
        name={'message'}
        control={form.control}
        render={({ field, fieldState, formState }) => (
          <Field data-invalid={fieldState.invalid} className={'grow'}>
            <FieldLabel htmlFor={field.name} className={'sr-only'}>
              Message
            </FieldLabel>
            <Textarea
              id={field.name}
              aria-invalid={fieldState.invalid}
              disabled={formState.isSubmitting}
              placeholder={'Message...'}
              autoComplete="off"
              autoFocus
              className={
                'resize-none max-h-80 bg-none border-none shadow-none focus-visible:border-none focus-visible:ring-0 min-h-4 m-0 p-0'
              }
              {...field}
            />
          </Field>
        )}
      />
      <Field orientation={'horizontal'} className={'w-fit'}>
        <Button type={'submit'} disabled={!form.formState.isValid}>
          Send
        </Button>
      </Field>
    </form>
  );
};
