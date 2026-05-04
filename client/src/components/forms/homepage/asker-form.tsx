import { createChat } from '@/api/fetch';
import { scoreLabels } from './shared';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { Spinner } from '@/components/ui/spinner';
import { useNavigate } from '@tanstack/react-router';
import { useFormSync } from '@/context/form-sync-provider';
import type { ApiResult, PostChatsData } from '@studdy-buddy/shared/types/api';
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from '@/components/ui/field';

type ValueTypes = (typeof scoreLabels)[number]['key'];
type FormSubmitType = { subject: ValueTypes };

export const AskerForm = () => {
  const navigate = useNavigate();
  const formSync = useFormSync();
  const form = useForm({ defaultValues: { subject: scoreLabels[0].key } });

  const onSubmit: SubmitHandler<FormSubmitType> = async ({ subject }) => {
    formSync.acquire();

    try {
      const res = await createChat({ subject });

      if (!res.ok) throw res;

      const { data, error }: ApiResult<PostChatsData> = await res.json();

      if (error) throw error;

      await navigate({ to: '/chats/$chatId', params: { chatId: data.id } });
    } catch (error) {
      console.error(error);
      form.setError('root', { message: 'Something went wrong creating room.' });
    }

    formSync.release();
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={'flex flex-col gap-2 mt-auto'}
    >
      {form.formState.errors.root && (
        <FieldError>{form.formState.errors.root.message}</FieldError>
      )}
      <FieldSet disabled={isSubmitting || formSync.isSubmitting}>
        <Controller
          name={'subject'}
          control={form.control}
          render={({ field: { onChange, ...rest }, fieldState }) => (
            <FieldSet>
              <RadioGroup onValueChange={onChange} {...rest}>
                {scoreLabels.map(({ key, label }) => (
                  <FieldLabel key={key} htmlFor={key}>
                    <Field orientation="horizontal">
                      <FieldContent>
                        <FieldTitle>{label}</FieldTitle>
                      </FieldContent>
                      <RadioGroupItem id={key} value={key} />
                    </Field>
                  </FieldLabel>
                ))}
              </RadioGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </FieldSet>
          )}
        />
        <Button type={'submit'}>
          {isSubmitting && <Spinner />}
          {isSubmitting ? 'Creating room...' : 'Ask a buddy'}
        </Button>
      </FieldSet>
    </form>
  );
};
