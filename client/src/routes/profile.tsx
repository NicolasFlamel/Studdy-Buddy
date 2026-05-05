import { AddSchedule } from '@/components/profiles/add-schedule';
import { ProfileContainer } from '@/components/profiles/container';
import { profileLoader } from '@/components/profiles/loaders';
import { ProfileScheduleTable } from '@/components/profiles/schedule-table';
import { ProfileTitle } from '@/components/profiles/title';
import { protectRoute } from '@/lib/before-load';
import { createFileRoute } from '@tanstack/react-router';

const ProfilePage = () => {
  const { user } = Route.useLoaderData();

  return (
    <ProfileContainer>
      <ProfileTitle username={user.username} />
      <AddSchedule />
      <ProfileScheduleTable
        isOwner={true}
        schedule={user.schedules}
        className={'max-w-lg'}
      />
    </ProfileContainer>
  );
};

export const Route = createFileRoute('/profile')({
  component: ProfilePage,
  beforeLoad: async ({ context, location }) => {
    await protectRoute(context.queryClient, location);
  },
  loader: profileLoader,
});
