import { Button } from '../ui/button';
import { Link } from '@tanstack/react-router';
import { useLogout } from '@/hooks/logout.mutation';
import { useAuth } from '@/hooks/use-auth';
import { ModeToggle } from '../mode-toggle';
import { GlassesIcon } from 'lucide-react';

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
      <nav className="nav flex flex-wrap justify-between p-4 shadow-md rounded-b-md">
        <div className={'flex flex-wrap gap-2 self-center'}>
          <p className={'text-2xl font-bold text-primary'}>Studdy Buddy</p>
          <GlassesIcon className={'size-8'} />
        </div>
        <section className={'flex flex-wrap gap-4 items-center'}>
          <Button asChild variant={'secondary'}>
            <Link to="/" className={'text-center'}>
              Home
            </Link>
          </Button>
          {user ? (
            <>
              <Button asChild variant={'secondary'}>
                <Link to="/profile">My Profile</Link>
              </Button>
              <Button asChild variant={'secondary'}>
                <Link to="/assessment">Update assessments</Link>
              </Button>
              <Button
                variant={'secondary'}
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button asChild variant={'secondary'}>
              <Link to="/login">Login</Link>
            </Button>
          )}
          <ModeToggle variant={'secondary'} />
        </section>
      </nav>
    </header>
  );
};
