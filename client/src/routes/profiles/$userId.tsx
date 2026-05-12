import { createFileRoute } from '@tanstack/react-router';
import { ProfileNotFoundPage } from '@/components/profiles/not-found';
import { ProfileContainer } from '@/components/profiles/container';
import { profilesLoader } from '@/components/profiles/loaders';
import { ProfileTitle } from '@/components/profiles/title';
import { ProfileScheduleTable } from '@/components/profiles/schedule-table';

const UserProfilePage = () => {
  const { user } = Route.useLoaderData();

  return (
    <ProfileContainer>
      <ProfileTitle username={user.username} />
      <ProfileScheduleTable
        isOwner={false}
        userId={user.id}
        className={'max-w-lg w-full'}
      />
    </ProfileContainer>
  );
};

export const Route = createFileRoute('/profiles/$userId')({
  head: () => ({
    meta: [
      {
        name: 'description',
        content:
          "View this user's schedule and reach out for help on assignments.",
      },
      {
        title: 'Study Buddy Profile',
      },
    ],
  }),
  component: UserProfilePage,
  loader: async ({ context, params: { userId } }) =>
    await profilesLoader({ userId, queryClient: context.queryClient }),
  notFoundComponent: ProfileNotFoundPage,
});
