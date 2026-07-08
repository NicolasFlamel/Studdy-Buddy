import { zodResolver } from '@hookform/resolvers/zod';
import type { ComponentProps } from 'react';
import {
  FormProvider,
  useForm,
  type SubmitErrorHandler,
  type SubmitHandler,
} from 'react-hook-form';
import {
  CreateScheduleFormSchema,
  type CreateScheduleFormSchemaType,
} from '@/schemas/forms';
import { cn } from '@/lib/utils';

interface FormProps extends Omit<
  ComponentProps<'form'>,
  'onSubmit' | 'onInvalid'
> {
  onSubmit: SubmitHandler<CreateScheduleFormSchemaType>;
  onInvalid?: SubmitErrorHandler<CreateScheduleFormSchemaType>;
  defaultValues?: CreateScheduleFormSchemaType;
}
export const ScheduleForm = ({
  children,
  onSubmit,
  onInvalid,
  defaultValues,
  className,
  ...props
}: FormProps) => {
  const form = useForm({
    resolver: zodResolver(CreateScheduleFormSchema),
    defaultValues: defaultValues ?? { date: new Date(), time: '10:30:00' },
  });

  return (
    <FormProvider {...form}>
      <form
        {...props}
        onSubmit={form.handleSubmit(onSubmit, onInvalid)}
        className={cn(
          'flex flex-col gap-8 items-center p-8 rounded-md',
          className,
        )}
      >
        {children}
      </form>
    </FormProvider>
  );
};
