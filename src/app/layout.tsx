import '@/globals.css';
import { Providers } from './providers';
import Footer from 'components/footer';
import NavBar from 'components/nav-bar';
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
    <html lang="en" className="light">
      <body>
        <Providers className="grid grid-rows-layout gap-4 min-w-80 min-h-screen">
          <NavBar className="nav" />
          <main className="max-w-screen-xl justify-self-center">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
