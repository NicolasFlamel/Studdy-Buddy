import {
  Controller,
  useForm,
  type ControllerRenderProps,
  type SubmitHandler,
} from 'react-hook-form';
import { Button } from '../ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CreateScheduleFormSchema,
  type CreateScheduleFormSchemaType,
} from '@/schemas/forms';
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { ChevronDownIcon } from 'lucide-react';
import { Calendar } from '../ui/calendar';
import { format } from 'date-fns';
import { useState } from 'react';
import { TimeInput } from '../ui/time';
import { useScheduleMutation } from '@/hooks/schedule.mutation';
import { Spinner } from '../ui/spinner';

type OnSubmitType = SubmitHandler<CreateScheduleFormSchemaType>;
export const AddSchedule = () => {
  const mutation = useScheduleMutation();
  const form = useForm({
    resolver: zodResolver(CreateScheduleFormSchema),
    defaultValues: { date: new Date(), time: '10:30:00' },
  });

  const onSubmit: OnSubmitType = async (values) => {
    const dateTime = `${format(values.date, 'yyyy-MM-dd')}T${values.time}`;
    const newSchedule = new Date(dateTime);

    mutation.mutate({ date: newSchedule });
  };

  const onInvalid = (errors: unknown) => {
    console.error(errors);
  };

  const isLoading = form.formState.isSubmitting || mutation.isPending;

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit, onInvalid)}
      className={'flex flex-col gap-8 items-center p-8 bg-accent rounded-md'}
    >
      <FieldGroup className="max-w-xs flex-row">
        <Controller
          name={'date'}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={'date-picker'}>Date</FieldLabel>
              <DatePicker id={'date-picker'} {...field} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name={'time'}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={'time-picker'}>Time</FieldLabel>
              <TimeInput
                id={'time-picker'}
                {...field}
                className={'border-foreground dark:border-input'}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <Button type={'submit'} disabled={isLoading} className={'w-fit'}>
        {isLoading && <Spinner />}
        {isLoading ? 'Adding schedule' : 'Add schedule'}
      </Button>
    </form>
  );
};

type DatePickerProps = ControllerRenderProps<
  CreateScheduleFormSchemaType,
  'date'
> & { id: string };
const DatePicker = ({ id, value, onChange, ...field }: DatePickerProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          className="w-32 justify-between font-normal"
        >
          {value ? format(value, 'PPP') : 'Select date'}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          captionLayout="dropdown"
          defaultMonth={value}
          onSelect={(date) => {
            onChange(date);
            setOpen(false);
          }}
          {...field}
        />
      </PopoverContent>
    </Popover>
  );
};
