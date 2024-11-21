import { HTMLAttributes } from 'react';
import { auth, signOut } from 'auth';
import Image from 'next/image';
import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';

const NavBar = async ({ className = '' }: HTMLAttributes<HTMLElement>) => {
  const session = await auth();

  return (
    <header className={className + ' flex w-full justify-center'}>
      <nav className="flex max-w-screen-xl w-full">
        <Image
          src="/images/nav-logo.png"
          alt="Studdy Buddy logo"
          width={713}
          height={55}
        />
        <section>
          <Link href="/">Home</Link>
          {!session?.user ? (
            <Link href="/login">Login Page</Link>
          ) : (
            <>
              <Link href="/profile">My Profile</Link>
              <Link href="/assessment">Update Assessments</Link>
              <form
                action={async () => {
                  'use server';
                  await signOut();
                }}
              >
                <Button type="submit">Signout</Button>
              </form>
            </>
          )}
        </section>
      </nav>
    </header>
  );
};

export default NavBar;
