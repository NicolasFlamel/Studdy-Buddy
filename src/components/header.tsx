import { HTMLAttributes } from 'react';
import { auth, signOut } from 'auth';
import Image from 'next/image';
import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/navbar';
import HeaderLinks from './headerLinks';

const Header = async ({ className = '' }: HTMLAttributes<HTMLElement>) => {
  const session = await auth();
  const isLoggedIn = !!session?.user;

  return (
    <Navbar className={className} isBordered>
      <NavbarBrand>
        <Image
          src="/images/nav-logo.png"
          alt="Studdy Buddy logo"
          width={200}
          height={36}
        />
      </NavbarBrand>

      <NavbarContent justify="center">
        <HeaderLinks user={isLoggedIn} />
      </NavbarContent>

      <NavbarContent justify="end">
        {isLoggedIn ? (
          <NavbarItem>
            <form
              action={async () => {
                'use server';
                await signOut();
              }}
            >
              <Button type="submit" variant="faded">
                Signout
              </Button>
            </form>
          </NavbarItem>
        ) : (
          <NavbarItem>
            <Button as={Link} href="/login" variant="faded">
              Login
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
