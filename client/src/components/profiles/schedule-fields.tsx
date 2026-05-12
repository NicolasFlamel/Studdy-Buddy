import {
  Controller,
  useFormContext,
  type ControllerRenderProps,
} from 'react-hook-form';
import { Button } from '../ui/button';
import { type CreateScheduleFormSchemaType } from '@/schemas/forms';
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { ChevronDownIcon } from 'lucide-react';
import { Calendar } from '../ui/calendar';
import { format } from 'date-fns';
import { useState } from 'react';
import { TimeInput } from '../ui/time';

export const ScheduleFields = () => {
  const { control } = useFormContext();

  return (
    <FieldGroup className="max-w-xs flex-row">
      <Controller
        name={'date'}
        control={control}
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
        control={control}
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
