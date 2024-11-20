'use client';

import { NextUIProvider } from '@nextui-org/react';
import { HTMLAttributes } from 'react';

interface ProvidersProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}
export function Providers({ className, children }: ProvidersProps) {
  return <NextUIProvider className={className}>{children}</NextUIProvider>;
}
