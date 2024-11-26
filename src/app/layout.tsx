import '@/layout.css';
import { Providers } from './providers';
import Footer from 'components/footer';
import Header from 'components/header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { template: '$s | Studdy Buddy', default: 'Studdy Buddy' },
  description: 'Studdy Buddy App',
};

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers className="grid grid-rows-layout gap-4 min-w-80 min-h-screen">
          <Header className="nav row-start-1" />
          <main className="w-full max-w-screen-xl justify-self-center row-start-2">
            {children}
          </main>
          <Footer className="row-start-3" />
        </Providers>
      </body>
    </html>
  );
}
