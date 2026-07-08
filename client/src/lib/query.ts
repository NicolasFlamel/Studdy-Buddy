import { QueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/hooks/query-keys';
import { router } from './router';

export const queryClient = new QueryClient();

queryClient.getQueryCache().subscribe((event) => {
  const isAuthSuccess =
    event.type === 'updated' &&
    event.action.type === 'success' &&
    event.query.queryKey.toString() === queryKeys.auth.toString();

  if (isAuthSuccess) router.invalidate();
});
