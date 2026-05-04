import { cn } from '@/lib/utils';
import { createFileRoute } from '@tanstack/react-router';
import userImage from '@/assets/images/person-studying.png';
import { fetchAssessment } from '@/api/fetch';
import { useAuth } from '@/hooks/use-auth';
import { isExpectedLoaderError } from '@/lib/loader';
import { AskerForm } from '@/components/forms/homepage/asker-form';
import { HelperForm } from '@/components/forms/homepage/helper-form';
import { TypographyH2, TypographyP } from '@/components/ui/typography';
import type { ApiResult, GetScoresData } from '@studdy-buddy/shared/types/api';
import { FormSyncProvider } from '@/context/form-sync-provider';
import { authOptions } from '@/hooks/auth.query';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <main className={'container grow p-4 flex flex-col gap-8 m-auto'}>
      <section className={'flex flex-col md:grid md:grid-cols-2 gap-4 '}>
        <section className={'flex flex-col m-auto'}>
          <TypographyH2 className={'text-center'}>
            Welcome{user && ' ' + user.username}!
          </TypographyH2>
          <TypographyP>
            Have you ever been struggling in class but you don't know who to
            reach out to? Introducing Studdy Buddy, an application that allows
            you to connect with your peers to discuss and work on different
            topics together.
          </TypographyP>
          <TypographyP>
            Users are able to rate their understanding of topics on a scale of
            1-5 and these scores are used to pair you with someone who
            understands the topic better than yourself. This allows students to
            learn from their peers and work together to solve problems rather
            than have to rely on an outside tutor or having to ask the teacher.
            Users can also choose to be the ones that provide help to their
            peers with the click of a button. Students connect in a chat room
            where they may discuss what they are struggling with.
          </TypographyP>
        </section>
        <div
          className={cn(
            'flex justify-center size-125 p-8 m-auto',
            'text-center bg-card shadow-lg rounded-md',
          )}
        >
          <img
            src={userImage}
            width={1595}
            height={1982}
            className={'w-auto'}
          />
        </div>
      </section>
      <section></section>
      {user && <BuddyForms />}
    </main>
  );
};

const BuddyForms = () => {
  const { scores } = Route.useLoaderData();

  if (!scores) return;

  return (
    <FormSyncProvider>
      <article className={'container grid grid-cols-2 gap-4 mx-auto'}>
        <AskerForm />
        <HelperForm scores={scores} />
      </article>
    </FormSyncProvider>
  );
};

type ResType = ApiResult<GetScoresData>;
export const Route = createFileRoute('/')({
  component: HomePage,
  loader: async ({ context }) => {
    const user = await context.queryClient.ensureQueryData(authOptions);

    if (!user) return {};

    try {
      const response = await fetchAssessment();

      if (!response.ok) {
        console.error(response);
        throw new Error(`Request failed with status ${response.status}`);
      }
      const { data, error }: ResType = await response.json();

      if (error) throw error;

      return { scores: data };
    } catch (error) {
      if (isExpectedLoaderError(error)) throw error;
      console.error(error);
      throw error;
    }
  },
});
