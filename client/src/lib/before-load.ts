import { authOptions } from '@/hooks/auth.query';
import { redirect, type ParsedLocation } from '@tanstack/react-router';
import type { QueryClient } from '@tanstack/react-query';

export const protectRoute = async (
  queryClient: QueryClient,
  location: ParsedLocation,
) => {
  const user = await queryClient.ensureQueryData(authOptions);

  if (!user) {
    throw redirect({
      to: '/login',
      search: {
        redirect: location.href,
      },
    });
  }
};

export const getUserFromClient = (queryClient: QueryClient) => {
  return queryClient.ensureQueryData(authOptions);
};
