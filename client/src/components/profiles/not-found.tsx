import { Link } from '@tanstack/react-router';
import { Button } from '../ui/button';

export const ProfileNotFoundPage = () => {
  return (
    <main className={'grow flex flex-col gap-4 m-auto p-8'}>
      <p>User not found.</p>
      <section className={'flex justify-center'}>
        <Button asChild>
          <Link to={'/'}>Go Home</Link>
        </Button>
      </section>
    </main>
  );
};
