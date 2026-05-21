import { Button } from '../ui/button';
import { Link } from '@tanstack/react-router';
import { useLogout } from '@/hooks/logout.mutation';
import { useAuth } from '@/hooks/use-auth';
import { ModeToggle } from '../mode-toggle';
import {
  FileTextIcon,
  GlassesIcon,
  HouseIcon,
  LogOutIcon,
  UserIcon,
} from 'lucide-react';
import type { ComponentProps } from 'react';

type VariantType = ComponentProps<typeof Button>['variant'];
const HEADER_BTN_VARIANT: VariantType = 'ghost';

export const Header = () => {
  const { user } = useAuth();
  const logoutMutation = useLogout();

  const handleLogout = async () => {
    logoutMutation.mutate(undefined, {
      onError: (error) => {
        console.error(error);
      },
    });
  };

  return (
    <header>
      <nav className="nav flex flex-wrap justify-between p-4 shadow-md border-b border-muted rounded-b-md">
        <div className={'flex flex-wrap gap-2 self-center'}>
          <p className={'text-2xl font-bold'}>Studdy Buddy</p>
          <GlassesIcon className={'size-8'} />
        </div>
        <section className={'flex flex-wrap gap-2 items-center'}>
          <Button asChild variant={HEADER_BTN_VARIANT}>
            <Link to="/" className={'text-center'}>
              <HouseIcon className="size-4" />
              Home
            </Link>
          </Button>
          {user ? (
            <>
              <Button asChild variant={HEADER_BTN_VARIANT}>
                <Link to="/profile">
                  <UserIcon className="size-4" />
                  My Profile
                </Link>
              </Button>
              <Button asChild variant={HEADER_BTN_VARIANT}>
                <Link to="/assessment">
                  <FileTextIcon className="size-4" />
                  Update assessments
                </Link>
              </Button>
              <Button
                variant={HEADER_BTN_VARIANT}
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
              >
                <LogOutIcon className="size-4" />
                Logout
              </Button>
            </>
          ) : (
            <Button asChild variant={HEADER_BTN_VARIANT}>
              <Link to="/login">Login</Link>
            </Button>
          )}
          <ModeToggle variant={HEADER_BTN_VARIANT} />
        </section>
      </nav>
    </header>
  );
};
