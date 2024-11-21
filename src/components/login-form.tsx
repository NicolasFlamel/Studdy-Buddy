'use client';

import { useActionState } from 'react';
import { authenticate } from 'lib/actions';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/react';

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form action={formAction}>
      <h2 className="container text-center">Login</h2>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        name="username"
        placeholder="Enter Username"
        required
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        name="password"
        placeholder="Enter Password"
        required
      />
      <Button type="submit" aria-disabled={isPending}>
        Login
      </Button>
      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {errorMessage && (
          <>
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{errorMessage}</p>
          </>
        )}
      </div>
    </form>
  );
}
