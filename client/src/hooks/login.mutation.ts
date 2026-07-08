import { loginPost } from '@/api/fetch';
import { authOptions } from './auth.query';
import type { LoginSchemaType } from '@studdy-buddy/shared/schemas/users';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ApiResult, RegisterData } from '@studdy-buddy/shared/types/api';

type ResponseType = ApiResult<RegisterData>;
export const useLogin = () => {
  const queryClient = useQueryClient();
  const { queryKey } = authOptions;

  return useMutation({
    mutationFn: async (credentials: LoginSchemaType) => {
      const res = await loginPost(credentials);

      if (!res.ok) throw res;

      const { data, error }: ResponseType = await res.json();

      if (error) throw error;

      return data;
    },
    retry: (failureCount, error) => {
      if (error instanceof Response && error.status === 401) return false;
      console.log('retry', error);
      return failureCount < 3;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(queryKey, data);
    },
    onError: (error) => {
      console.error(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
