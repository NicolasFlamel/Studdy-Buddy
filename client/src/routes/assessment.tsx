import { fetchAssessment } from '@/api/fetch';
import { AssessmentForm } from '@/components/forms/assessment-form';
import { protectRoute } from '@/lib/before-load';
import { Await, createFileRoute } from '@tanstack/react-router';
import { isExpectedLoaderError } from '@/lib/loader';
import type { ApiResult, GetScoresData } from '@studdy-buddy/shared/types/api';
import { AssessmentFormSkeleton } from '@/components/skeletons/assessment-form';
import type { ScoresType } from '@/types/scores';
import { TypographyH1, TypographyP } from '@/components/ui/typography';

const AssessmentPage = () => {
  const { assessmentPromise } = Route.useLoaderData();

  return (
    <main className={'grow p-8 flex flex-col gap-8 items-center'}>
      <div className={'container text-center assessment-title'}>
        <TypographyH1>Self-assessment</TypographyH1>
        <TypographyP>
          Rate your understanding of each topic from 1 to 5.
        </TypographyP>
        <p>1 = Completely new</p>
        <p>5 = Confident enough to teach it</p>
      </div>
      <Await promise={assessmentPromise} fallback={AssessmentFormSkeleton()}>
        {({ assessment }) => {
          if (!assessment) return;
          const formatted = arrayToScores(assessment);
          return <AssessmentForm initialValues={formatted} />;
        }}
      </Await>
    </main>
  );
};

type ResType = ApiResult<GetScoresData>;
export const Route = createFileRoute('/assessment')({
  component: AssessmentPage,
  beforeLoad: async ({ context, location }) => {
    await protectRoute(context.queryClient, location);
  },
  loader: async () => {
    const assessmentPromise = handleFetchAssessments();

    return { assessmentPromise };
  },
});

const handleFetchAssessments = async () => {
  try {
    const response = await fetchAssessment();

    if (!response.ok) {
      console.error(response);
      throw new Error(`Request failed with status ${response.status}`);
    }

    const { data, error }: ResType = await response.json();

    if (error) throw error;

    return { assessment: data };
  } catch (error) {
    if (isExpectedLoaderError(error)) throw error;
    console.error(error);
    throw error;
  }
};

const arrayToScores = (assessments: GetScoresData) => {
  const defaultScores: ScoresType = {
    vanillaJs: 1,
    mySql: 1,
    nodeJs: 1,
    express: 1,
    oop: 1,
  };

  assessments.forEach(({ subject, rating }) => {
    defaultScores[subject] = rating;
  });

  return defaultScores;
};
