import { deleteSchedule, createSchedule, editSchedule } from '@/api/fetch';
import { useMutation } from '@tanstack/react-query';
import type { PostScheduleAPIReqBody } from '@/types/api';
import type {
  ApiResult,
  DeleteScheduleData,
  PostScheduleData,
} from '@studdy-buddy/shared/types/api';
import type { EditScheduleSchemaType } from '@studdy-buddy/shared/schemas';

type PostScheduleResType = ApiResult<PostScheduleData>;
export const useScheduleMutation = () => {
  return useMutation({
    mutationFn: async (schedule: PostScheduleAPIReqBody) => {
      const res = await createSchedule(schedule);

      if (!res.ok) throw res;

      const { data, error }: PostScheduleResType = await res.json();

      if (error) throw error;

      return data;
    },
    onError: (error) => {
      console.error(error);
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
  });
};

type DeleteScheduleResType = ApiResult<DeleteScheduleData>;
export const useScheduleDeleteMutation = () => {
  return useMutation({
    mutationFn: async (scheduleId: string) => {
      const res = await deleteSchedule(scheduleId);

      if (!res.ok) throw res;

      const { error }: DeleteScheduleResType = await res.json();

      if (error) throw error;
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
