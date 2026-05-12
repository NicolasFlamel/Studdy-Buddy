import { format } from 'date-fns';
import { Button } from '../ui/button';
import type { ComponentProps, ReactNode } from 'react';
import { AlertCircleIcon, MoreHorizontalIcon } from 'lucide-react';
import { useScheduleDeleteMutation } from '@/hooks/schedule.mutation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useUserScheduleQuery } from '@/hooks/schedule.query';
import { Skeleton } from '../ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { EditSchedule } from './edit-schedule';

interface Props extends ComponentProps<typeof Table> {
  isOwner: boolean;
  userId: string;
}
export const ProfileScheduleTable = ({
  userId,
  isOwner,
  ...tableProps
}: Props) => {
  const { isPending, isError, data: schedules } = useUserScheduleQuery(userId);

  if (isError) return <ErroredTable />;

  return (
    <Table {...tableProps}>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
          {isOwner && <TableHead className={'text-right'}>Actions</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {isPending ? (
          <>
            <PendingRow />
            <PendingRow />
            <PendingRow />
            <PendingRow />
          </>
        ) : (
          schedules.map(({ id, date }) => (
            <TableRow key={id}>
              <TableCell>{format(date, 'MMM dd, yyyy')}</TableCell>
              <TableCell>{format(date, 'h:mm a')}</TableCell>
              {isOwner && (
                <TableCell className={'text-right'}>
                  <TableActions>
                    <EditSchedule
                      asChild
                      scheduleId={id}
                      values={{
                        date: new Date(date),
                        time: format(date, 'hh:mm:ss'),
                      }}
                    >
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        Edit
                      </DropdownMenuItem>
                    </EditSchedule>
                    <DropdownMenuSeparator />
                    <DeleteMenuItem id={id} variant="destructive">
                      Delete
                    </DeleteMenuItem>
                  </TableActions>
                </TableCell>
              )}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

interface MenuItemProps extends ComponentProps<typeof DropdownMenuItem> {
  id: string;
  children: ReactNode;
}
const DeleteMenuItem = ({ children, id, ...props }: MenuItemProps) => {
  const deleteMutation = useScheduleDeleteMutation();

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };
  return (
    <DropdownMenuItem {...props} onClick={() => handleDelete(id)}>
      {children}
    </DropdownMenuItem>
  );
};

interface ActionProps {
  children: ReactNode;
}
const TableActions = ({ children }: ActionProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8">
          <MoreHorizontalIcon />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">{children}</DropdownMenuContent>
    </DropdownMenu>
  );
};

const PendingRow = () => {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className={'w-full h-4'} />
      </TableCell>
      <TableCell>
        <Skeleton className={'w-full h-4'} />
      </TableCell>
      <TableCell>
        <Skeleton className={'w-full h-4'} />
      </TableCell>
    </TableRow>
  );
};

const ErroredTable = () => {
  return (
    <Alert variant="destructive" className="mx-auto max-w-md">
      <AlertCircleIcon />
      <AlertTitle>Something went wrong.</AlertTitle>
      <AlertDescription>
        Could not fetch user's schedule from the server.
      </AlertDescription>
    </Alert>
  );
};
