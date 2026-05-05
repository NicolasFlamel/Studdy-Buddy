import { format } from 'date-fns';
import { Button } from '../ui/button';
import type { ComponentProps, ReactNode } from 'react';
import { MoreHorizontalIcon } from 'lucide-react';
import type { GetUserProfileByIdData } from '@studdy-buddy/shared/types/api';
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

interface Props extends ComponentProps<typeof Table> {
  schedule: GetUserProfileByIdData['schedules'];
  isOwner: boolean;
}
export const ProfileScheduleTable = ({
  schedule,
  isOwner,
  ...tableProps
}: Props) => {
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
        {schedule.map(({ id, date }) => (
          <TableRow key={id}>
            <TableCell>{format(date, 'MMM d, yyyy')}</TableCell>
            <TableCell>{format(date, 'h:mm a')}</TableCell>
            {isOwner && (
              <TableCell className={'text-right'}>
                <TableActions>
                  <EditMenuItem id={id}>Edit</EditMenuItem>
                  <DropdownMenuSeparator />
                  <DeleteMenuItem id={id} variant="destructive">
                    Delete
                  </DeleteMenuItem>
                </TableActions>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

interface MenuItemProps extends ComponentProps<typeof DropdownMenuItem> {
  id: string;
  children: ReactNode;
}
const EditMenuItem = ({ id, children, ...props }: MenuItemProps) => {
  const handleEdit = (id: string) => {
    console.log(id);
  };

  return (
    <DropdownMenuItem {...props} onClick={() => handleEdit(id)}>
      {children}
    </DropdownMenuItem>
  );
};

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
