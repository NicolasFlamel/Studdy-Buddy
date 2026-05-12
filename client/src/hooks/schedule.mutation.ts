import { deleteSchedule, createSchedule, editSchedule } from '@/api/fetch';
import { useMutation } from '@tanstack/react-query';
import type { PostScheduleAPIReqBody } from '@/types/api';
import type {
  ApiResult,
  DeleteScheduleData,
  PostScheduleData,
} from '@studdy-buddy/shared/types/api';
import type { EditScheduleSchemaType } from '@studdy-buddy/shared/schemas';
import { queryClient } from '@/lib/query';
import { queryKeys } from './query-keys';
import { scheduleOptions } from './schedule.query';

type PostScheduleResType = ApiResult<PostScheduleData>;
export const useCreateScheduleMutation = () => {
  return useMutation({
    mutationFn: async (schedule: PostScheduleAPIReqBody) => {
      const res = await createSchedule(schedule);

      if (!res.ok) throw res;

      const { data, error }: PostScheduleResType = await res.json();

      if (error) throw error;

      return data;
    },
    onSuccess: async (data) => {
      const queryKey = scheduleOptions(data.userId).queryKey;
      const prev = queryClient.getQueryData(queryKey) || [];

      queryClient.setQueryData(queryKey, [...prev, data]);
    },
    onError: (error) => {
      console.error(error);
    },
    onSettled: async () => {
      const queryKey = queryKeys.schedules.all;

      await queryClient.invalidateQueries({ queryKey: queryKey });
    },
  });
};

export const useScheduleUpdateMutation = () => {
  return useMutation({
    mutationFn: async (schedule: EditScheduleSchemaType) => {
      const res = await editSchedule(schedule);

      if (!res.ok) throw res;

      const { data, error }: PostScheduleResType = await res.json();

      if (error) throw error;

      return data;
    },
    onError: (error) => {
      console.error(error);
    },
    onSettled: async () => {
      const queryKey = queryKeys.schedules.all;

      await queryClient.invalidateQueries({ queryKey: queryKey });
    },
  });
};

type DeleteScheduleResType = ApiResult<DeleteScheduleData>;
export const useScheduleDeleteMutation = () => {
  return useMutation({
    mutationFn: async (scheduleId: string) => {
      const res = await deleteSchedule(scheduleId);

      if (!res.ok) throw res;

      const { error, data }: DeleteScheduleResType = await res.json();

      if (error) throw error;

      return data;
    },
    onSuccess: async (data) => {
      const queryKey = scheduleOptions(data.userId).queryKey;
      const staleData = queryClient.getQueryData(queryKey) ?? [];
      const newData = staleData.filter((schedule) => schedule.id !== data.id);

      queryClient.setQueryData(queryKey, newData);
    },
    onError: (error) => {
      console.error(error);
    },
    onSettled: async () => {
      const queryKey = queryKeys.schedules.all;

      await queryClient.invalidateQueries({ queryKey: queryKey });
    },
  });
};
