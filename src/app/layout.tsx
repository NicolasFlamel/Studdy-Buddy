import '@/globals.css';
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
    <html lang="en">
      <body>
        <NavBar />
        <main className="max-w-screen-xl justify-self-center">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
