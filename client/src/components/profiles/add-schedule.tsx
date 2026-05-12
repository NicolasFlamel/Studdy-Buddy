import type { ReactNode } from 'react';
import { useScheduleMutation } from '@/hooks/schedule.mutation';
import { ScheduleFields } from './schedule-fields';
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { Button } from '../ui/button';
import { Spinner } from '../ui/spinner';
import {
  CreateScheduleFormSchema,
  type CreateScheduleFormSchemaType,
} from '@/schemas/forms';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { CalendarPlus } from 'lucide-react';

type OnSubmitType = SubmitHandler<CreateScheduleFormSchemaType>;
export const AddSchedule = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <span className="sr-only">Add schedule</span>
          <CalendarPlus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Schedule</DialogTitle>
          <DialogDescription>
            Add a new schedule by selecting a date and time.
          </DialogDescription>
          <ScheduleForm>
            <ScheduleFields />
          </ScheduleForm>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

type FormProps = {
  children: ReactNode;
};
const ScheduleForm = ({ children }: FormProps) => {
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
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onInvalid)}
        className={'flex flex-col gap-8 items-center p-8 rounded-md'}
      >
        {children}
        <DialogFooter>
          <Button type={'submit'} disabled={isLoading} className={'w-fit'}>
            {isLoading && <Spinner />}
            {isLoading ? 'Adding schedule' : 'Add schedule'}
          </Button>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </FormProvider>
  );
};
