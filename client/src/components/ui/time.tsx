import type { ComponentProps } from 'react';
import { Input } from './input';
import { cn } from '@/lib/utils';

export const TimeInput = ({
  className,
  ...props
}: ComponentProps<typeof Input>) => {
  return (
    <Input
      {...props}
      type={'time'}
      step={'1'}
      className={cn(
        'appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none',
        className,
      )}
    />
  );
};
