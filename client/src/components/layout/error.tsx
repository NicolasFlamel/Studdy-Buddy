import { Link, type ErrorComponentProps } from '@tanstack/react-router';
import { Button } from '../ui/button';
import { CancelledError } from '@tanstack/react-query';

export const ErrorPage = ({ error, reset, info }: ErrorComponentProps) => {
  if (error instanceof CancelledError) {
    return null;
  }

  console.error(error);

  if (info) console.log(info);

  const handleClick = () => {
    reset();
  };

  return (
    <main className={'grow flex flex-col items-center m-8 gap-4'}>
      <p>{'Something went wrong. :('}</p>
      <div className={'flex flex-wrap gap-8'}>
        <Button onClick={handleClick}>Reset</Button>
        <Button asChild>
          <Link to={'/'}>Go Home</Link>
        </Button>
      </div>
    </main>
  );
};
