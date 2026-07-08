import type { ComponentProps } from 'react';

export const ProfileContainer = ({ children }: ComponentProps<'main'>) => {
  return (
    <main className={'grow m-auto pt-8 flex flex-col gap-8 max-w-lg w-full'}>
      {children}
    </main>
  );
};
