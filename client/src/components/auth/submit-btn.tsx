import type { ComponentProps } from 'react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

interface SubmitBtn extends ComponentProps<typeof Button> {
  children: React.ReactNode;
}
export const SubmitBtn = ({ children, className, ...props }: SubmitBtn) => {
  return (
    <Button type={'submit'} className={cn('', className)} {...props}>
      {children}
    </Button>
  );
};
