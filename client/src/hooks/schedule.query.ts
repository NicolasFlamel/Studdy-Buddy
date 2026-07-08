import { queryOptions, useQuery } from '@tanstack/react-query';
import { queryKeys } from './query-keys';
import {
  fetchUserSchedules,
  type FetchUserSchedulesResType,
} from '@/api/fetch';

export const scheduleOptions = (userId: string) =>
  queryOptions({
    queryKey: queryKeys.schedules.byUserId(userId),
    queryFn: async ({ signal }) => {
      const res = await fetchUserSchedules(userId, { signal });

      if (!res.ok) throw new Error(res.statusText);

      const { data, error }: FetchUserSchedulesResType = await res.json();

      if (error) throw new Error(error.message);

      return data;
    },
  });

export const useUserScheduleQuery = (userId: string) =>
  useQuery(scheduleOptions(userId));
