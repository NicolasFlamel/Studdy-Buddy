'use client';

import { useActionState } from 'react';
import { authenticate } from 'lib/actions';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form action={formAction}>
      <h2 className="container text-center">Login</h2>
      <label>Username:</label>
      <input id="username" type="text" name="name" className="username" />
      <label>Password:</label>
      <input
        id="password"
        type="password"
        name="password"
        className="password"
      />
      <button
        id="homepage-login"
        className="btn btn-grad"
        aria-disabled={isPending}
      >
        Login
      </button>
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
