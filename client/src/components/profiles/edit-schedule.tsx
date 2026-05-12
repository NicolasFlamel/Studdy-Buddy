import { useState, type ComponentProps, type ReactNode } from 'react';
import { useScheduleUpdateMutation } from '@/hooks/schedule.mutation';
import { ScheduleFields } from './schedule-fields';
import { type SubmitHandler } from 'react-hook-form';
import { format } from 'date-fns';
import { Button } from '../ui/button';
import { type CreateScheduleFormSchemaType } from '@/schemas/forms';
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
import { ScheduleForm } from './schedule-form';
import { Spinner } from '../ui/spinner';

type OnSubmitType = SubmitHandler<CreateScheduleFormSchemaType>;
interface EditScheduleProps extends ComponentProps<typeof DialogTrigger> {
  scheduleId: string;
  children: ReactNode;
  values: CreateScheduleFormSchemaType;
}
export const EditSchedule = ({
  scheduleId,
  children,
  values,
  ...props
}: EditScheduleProps) => {
  const [open, setOpen] = useState(false);

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger {...props}>{children}</DialogTrigger>
      <EditScheduleDialogContent
        scheduleId={scheduleId}
        onSuccess={handleCloseDialog}
        values={values}
      />
    </Dialog>
  );
};

type Props = {
  scheduleId: string;
  onSuccess: () => void;
  values: CreateScheduleFormSchemaType;
};
const EditScheduleDialogContent = ({
  scheduleId,
  values,
  onSuccess,
}: Props) => {
  const mutation = useScheduleUpdateMutation();

  const onSubmit: OnSubmitType = async (values) => {
    const dateTime = `${format(values.date, 'yyyy-MM-dd')}T${values.time}`;
    const newSchedule = new Date(dateTime);

    mutation.mutate({ id: scheduleId, date: newSchedule }, { onSuccess });
  };

  const onInvalid = (errors: unknown) => {
    console.error(errors);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Schedule</DialogTitle>
        <DialogDescription>
          Edit a schedule by selecting a date and time.
        </DialogDescription>
      </DialogHeader>
      <ScheduleForm
        id={'edit-schedule-form'}
        onSubmit={onSubmit}
        onInvalid={onInvalid}
        defaultValues={values}
      >
        <ScheduleFields />
      </ScheduleForm>
      <DialogFooter>
        <Button
          type="submit"
          form="edit-schedule-form"
          disabled={mutation.isPending}
          className="w-fit"
        >
          {mutation.isPending && <Spinner />}
          {mutation.isPending ? 'Editing schedule...' : 'Edit schedule'}
        </Button>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};
