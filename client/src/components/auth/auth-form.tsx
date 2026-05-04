import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';

export const AuthForm = ({
  className,
  children,
  title,
  ...props
}: ComponentProps<'form'>) => {
  return (
    <form
      className={cn('flex flex-col justify-center gap-4', className)}
      title={title}
      {...props}
    >
      <h2 className={'text-center'}>{title}</h2>
      {children}
    </form>
  );
};
