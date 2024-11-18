import '@/globals.css';
import NavBar from 'components/nav-bar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { template: '$s | Studdy Buddy', default: 'Studdy Buddy' },
  description: 'Studdy Buddy App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
