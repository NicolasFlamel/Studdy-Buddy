import { useState, type ComponentProps, type ReactNode } from 'react';
import { useCreateScheduleMutation } from '@/hooks/schedule.mutation';
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
interface AddScheduleProps extends ComponentProps<typeof DialogTrigger> {
  children: ReactNode;
}
export const AddSchedule = ({ children, ...props }: AddScheduleProps) => {
  const [open, setOpen] = useState(false);

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger {...props}>{children}</DialogTrigger>
      <AddScheduleDialogContent onSuccess={handleCloseDialog} />
    </Dialog>
  );
};

type Props = {
  onSuccess: () => void;
};
const AddScheduleDialogContent = ({ onSuccess }: Props) => {
  const mutation = useCreateScheduleMutation();

  const onSubmit: OnSubmitType = async (values) => {
    const dateTime = `${format(values.date, 'yyyy-MM-dd')}T${values.time}`;
    const newSchedule = new Date(dateTime);

    mutation.mutate({ date: newSchedule }, { onSuccess });
  };

  const onInvalid = (errors: unknown) => {
    console.error(errors);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add Schedule</DialogTitle>
        <DialogDescription>
          Add a new schedule by selecting a date and time.
        </DialogDescription>
      </DialogHeader>
      <ScheduleForm
        id={'add-schedule-form'}
        onSubmit={onSubmit}
        onInvalid={onInvalid}
      >
        <ScheduleFields />
      </ScheduleForm>
      <DialogFooter>
        <Button
          type="submit"
          form="add-schedule-form"
          disabled={mutation.isPending}
          className="w-fit"
        >
          {mutation.isPending && <Spinner />}
          {mutation.isPending ? 'Adding schedule...' : 'Add schedule'}
        </Button>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};
