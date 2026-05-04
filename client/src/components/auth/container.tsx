import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';

export const AuthContainer = ({
  className,
  children,
  ...props
}: ComponentProps<'section'>) => {
  return (
    <main className={'grow relative'}>
      <section
        className={cn(
          'absolute left-1/2 top-1/2 -translate-1/2',
          'container text-center p-4 max-w-md bg-accent rounded-md flex flex-col gap-4',
          className,
        )}
        {...props}
      >
        {children}
      </section>
    </main>
  );
};
