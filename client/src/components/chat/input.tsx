import { Button } from '../ui/button';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChatFormSchema, type ChatFormSchemaType } from '@/schemas/forms';
import { Field, FieldLabel } from '../ui/field';
import { useChat } from '@/context/chat-provider';
import { Input } from '../ui/input';
import { SendIcon } from 'lucide-react';

export const ChatInput = () => {
  const { sendMessage } = useChat();
  const form = useForm({
    resolver: zodResolver(ChatFormSchema),
    defaultValues: { message: '' },
  });

  const onSubmit: SubmitHandler<ChatFormSchemaType> = async (values) => {
    await sendMessage(values.message);

    form.reset();
    form.setFocus('message');
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className={'flex gap-4 p-2'}>
      <Controller
        name={'message'}
        control={form.control}
        render={({ field, formState }) => (
          <Field className={'grow h-full'}>
            <FieldLabel htmlFor={field.name} className={'sr-only'}>
              Message
            </FieldLabel>
            <Input
              autoFocus
              {...field}
              id={field.name}
              autoComplete="off"
              disabled={formState.isSubmitting}
              placeholder={'Message...'}
              className={'h-full bg-input/30'}
            />
          </Field>
        )}
      />
      <Button type={'submit'} size={'icon'} disabled={!form.formState.isValid}>
        <span className={'sr-only'}>Send</span>
        <SendIcon className={'size-4'} />
      </Button>
    </form>
  );
};
