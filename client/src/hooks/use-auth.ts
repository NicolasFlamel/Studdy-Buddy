import { useQueryClient } from '@tanstack/react-query';
import { authOptions, useAuthQuery } from './auth.query';
import { router } from '@/lib/router';
import type { ResAuthUser } from '@/types/api';

type AuthState =
  | { user: null; status: 'PENDING' }
  | { user: null; status: 'UNAUTHENTICATED' }
  | { user: ResAuthUser; status: 'AUTHENTICATED' };

type AuthUtils = {
  signIn: () => void;
  signOut: () => void;
  ensureData: () => Promise<ResAuthUser | undefined | null>;
};

type AuthData = AuthState & AuthUtils;

function useAuth(): AuthData {
  const userQuery = useAuthQuery();
  const queryClient = useQueryClient();

  const utils: AuthUtils = {
    signIn: () => {
      router.navigate({ to: '/login' });
    },
    signOut: () => {
      queryClient.setQueryData(authOptions.queryKey, null);
    },
    ensureData: () => {
      return queryClient.ensureQueryData(authOptions);
    },
  };

  switch (true) {
    case userQuery.isPending:
      return { ...utils, user: null, status: 'PENDING' };
    case userQuery.isError:
    case userQuery.data === null:
      return { ...utils, user: null, status: 'UNAUTHENTICATED' };
    default:
      return { ...utils, user: userQuery.data, status: 'AUTHENTICATED' };
  }
}

export { useAuth };
export type { AuthData };
