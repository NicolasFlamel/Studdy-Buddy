import type { ComponentProps } from 'react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

export const Footer = () => {
  return (
    <footer>
      <div className="container p-2 m-auto">
        <section className="flex justify-end w-full gap-2">
          <SocialMediaLink className={'bg-blue-600 hover:bg-blue-600/80'}>
            <span className={'sr-only'}>Facebook</span>
          </SocialMediaLink>
          <SocialMediaLink className={'bg-sky-400 hover:bg-sky-400/80'}>
            <span className={'sr-only'}>Twitter</span>
          </SocialMediaLink>
          <SocialMediaLink className={'bg-purple-600 hover:bg-purple-600/80'}>
            <span className={'sr-only'}>Instagram</span>
          </SocialMediaLink>
          <SocialMediaLink className={'bg-blue-600 hover:bg-blue-600/80'}>
            <span className={'sr-only'}>Linkedin</span>
          </SocialMediaLink>
        </section>
      </div>
    </footer>
  );
};

const SocialMediaLink = ({
  children,
  className,
  ...props
}: ComponentProps<'a'>) => {
  return (
    <Button
      asChild
      size={'icon-sm'}
      className={cn('w-6 h-3 cursor-pointer', className)}
    >
      <a {...props}>{children}</a>
    </Button>
  );
};
