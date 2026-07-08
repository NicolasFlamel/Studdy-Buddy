import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';

const TypographyH1 = ({
  children,
  className,
  ...props
}: ComponentProps<'h1'>) => {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance',
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  );
};

const TypographyH2 = ({
  children,
  className,
  ...props
}: ComponentProps<'h2'>) => {
  return (
    <h2
      className={cn(
        'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  );
};

const TypographyH3 = ({
  children,
  className,
  ...props
}: ComponentProps<'h3'>) => {
  return (
    <h3
      className={cn(
        'scroll-m-20 text-2xl font-semibold tracking-tight',
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  );
};

const TypographyH4 = ({
  children,
  className,
  ...props
}: ComponentProps<'h4'>) => {
  return (
    <h4
      className={cn(
        'scroll-m-20 text-xl font-semibold tracking-tight',
        className,
      )}
      {...props}
    >
      {children}
    </h4>
  );
};

const TypographyP = ({
  children,
  className,
  ...props
}: ComponentProps<'p'>) => {
  return (
    <p className={cn('leading-7 not-first:mt-6', className)} {...props}>
      {children}
    </p>
  );
};

const TypographyBlockquote = ({
  children,
  className,
  ...props
}: ComponentProps<'blockquote'>) => {
  return (
    <blockquote
      className={cn('mt-6 border-l-2 pl-6 italic', className)}
      {...props}
    >
      {children}
    </blockquote>
  );
};

const TypographyList = ({
  children,
  className,
  ...props
}: ComponentProps<'ul'>) => {
  return (
    <ul className={cn('my-6 ml-6 list-disc [&>li]:mt-2', className)} {...props}>
      {children}
    </ul>
  );
};

const TypographyInlineCode = ({
  children,
  className,
  ...props
}: ComponentProps<'code'>) => {
  return (
    <code
      className={cn(
        'bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
        className,
      )}
      {...props}
    >
      {children}
    </code>
  );
};

const TypographyLarge = ({
  children,
  className,
  ...props
}: ComponentProps<'div'>) => {
  return (
    <div className={cn('text-lg font-semibold', className)} {...props}>
      {children}
    </div>
  );
};

const TypographySmall = ({
  children,
  className,
  ...props
}: ComponentProps<'small'>) => {
  return (
    <small
      className={cn('text-sm leading-none font-medium', className)}
      {...props}
    >
      {children}
    </small>
  );
};

const TypographyMuted = ({
  children,
  className,
  ...props
}: ComponentProps<'p'>) => {
  return (
    <p className={cn('text-muted-foreground text-sm', className)} {...props}>
      {children}
    </p>
  );
};

export {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyP,
  TypographyBlockquote,
  TypographyList,
  TypographyInlineCode,
  TypographyLarge,
  TypographySmall,
  TypographyMuted,
};
