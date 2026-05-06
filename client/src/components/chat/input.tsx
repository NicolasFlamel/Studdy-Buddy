import { Button } from '../ui/button';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChatFormSchema, type ChatFormSchemaType } from '@/schemas/forms';
import { Field, FieldLabel } from '../ui/field';
import { Textarea } from '../ui/textarea';
import { useChat } from '@/context/chat-provider';
import type { KeyboardEventHandler } from 'react';

export const ChatInput = () => {
  const { sendMessage } = useChat();
  const form = useForm({
    resolver: zodResolver(ChatFormSchema),
    defaultValues: { message: '' },
  });

  const onSubmit: SubmitHandler<ChatFormSchemaType> = async (values) => {
    await sendMessage(values.message);
    form.reset();
  };

  const handleOnKeyUp: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();

      void form.handleSubmit(onSubmit)();
    }
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
        render={({ field, formState }) => (
          <Field className={'grow h-full'}>
            <FieldLabel htmlFor={field.name} className={'sr-only'}>
              Message
            </FieldLabel>
            <Textarea
              autoFocus
              {...field}
              id={field.name}
              autoComplete="off"
              disabled={formState.isSubmitting}
              placeholder={'Message...'}
              className={
                'resize-none max-h-40 min-h-4 h-full border-none focus-visible:ring-0'
              }
              onKeyDown={handleOnKeyUp}
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
