import { postAssessment } from '@/api/fetch';
import { useMutation } from '@tanstack/react-query';
import type { ScoresFormType } from '@studdy-buddy/shared/schemas/scores';
import type { ApiResult, PostScoresData } from '@studdy-buddy/shared/types/api';

type ResType = ApiResult<PostScoresData>;
export const useScoresMutation = () => {
  return useMutation({
    mutationFn: async (scores: ScoresFormType) => {
      const res = await postAssessment(scores);

      if (!res.ok) throw res;

      const { data, error }: ResType = await res.json();

      if (error) throw error;

      return data;
    },
    retry: (failureCount, error) => {
      console.log('retry', error);
      if (error instanceof Response && error.status === 401) return false;
      return failureCount < 3;
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
