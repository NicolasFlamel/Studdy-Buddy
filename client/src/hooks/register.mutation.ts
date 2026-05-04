import { registerPost } from '@/api/fetch';
import { authOptions } from './auth.query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateUserSchemaType } from '@studdy-buddy/shared/schemas/users';
import type { ApiResult, RegisterData } from '@studdy-buddy/shared/types/api';

type ResType = ApiResult<RegisterData>;
export const useRegister = () => {
  const queryClient = useQueryClient();
  const { queryKey } = authOptions;

  return useMutation({
    mutationFn: async (credentials: CreateUserSchemaType) => {
      const res = await registerPost(credentials);

      if (!res.ok) throw res;

      const { data, error }: ResType = await res.json();

      if (error) throw error;

      return data;
    },
    retry: (failureCount, error) => {
      if (error instanceof Response && error.status === 409) return false;
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
