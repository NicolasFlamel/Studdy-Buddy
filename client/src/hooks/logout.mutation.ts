import { logoutPost } from '@/api/fetch';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authOptions } from './auth.query';
import type { ApiResult, LogoutData } from '@studdy-buddy/shared/types/api';

type ResType = ApiResult<LogoutData>;
export const useLogout = () => {
  const queryClient = useQueryClient();
  const { queryKey } = authOptions;

  return useMutation({
    mutationFn: async () => {
      const res = await logoutPost();

      if (!res.ok) throw res;

      const { error }: ResType = await res.json();

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.setQueryData(queryKey, null);
    },
    onError: (error) => {
      console.error(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
