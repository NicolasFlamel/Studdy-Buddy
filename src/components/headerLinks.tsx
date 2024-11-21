'use client';

import { Link, NavbarItem } from '@nextui-org/react';
import { usePathname } from 'next/navigation';

interface HeaderLinksProps {
  user: boolean;
}
const HeaderLinks = ({ user }: HeaderLinksProps) => {
  const pathname = usePathname();
  const isActive = (path: string): boolean => path === pathname;

  return (
    <>
      <NavbarItem isActive={isActive('/')}>
        <Link href="/">Home</Link>
      </NavbarItem>
      {user ? (
        <>
          <NavbarItem isActive={isActive('/assessment')}>
            <Link href="/assessment">Update Assessments</Link>
          </NavbarItem>
          <NavbarItem isActive={isActive('/profile')}>
            <Link href="/profile">My Profile</Link>
          </NavbarItem>
        </>
      ) : null}
    </>
  );
};

export default HeaderLinks;
