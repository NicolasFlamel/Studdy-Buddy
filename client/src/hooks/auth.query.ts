import { API } from '@/lib/api';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { queryKeys } from './query-keys';
import type { ApiResult, UserMeAPIData } from '@studdy-buddy/shared/types/api';

type ResType = ApiResult<UserMeAPIData>;
export const authOptions = queryOptions({
  queryKey: queryKeys.auth,
  queryFn: async ({ signal }) => {
    const res = await fetch(API.users.me(), { signal });

    if (res.status === 401) return null;
    else if (!res.ok) {
      console.error(res);
      throw new Error(`Request failed with status ${res.status}`);
    }

    const { data, error }: ResType = await res.json();

    if (error) throw new Error(error.message);

    return data;
  },
  staleTime: 1000 * 60 * 5,
});

export const useAuthQuery = () => {
  return useQuery(authOptions);
};
