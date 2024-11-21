'use client';

import { NextUIProvider } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { HTMLAttributes } from 'react';

interface ProvidersProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}
export function Providers({ className, children }: ProvidersProps) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push} className={className}>
      {children}
    </NextUIProvider>
  );
}
