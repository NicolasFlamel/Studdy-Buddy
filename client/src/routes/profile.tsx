import { AddSchedule } from '@/components/profiles/add-schedule';
import { ProfileContainer } from '@/components/profiles/container';
import { profileLoader } from '@/components/profiles/loaders';
import { ProfileScheduleTable } from '@/components/profiles/schedule-table';
import { ProfileTitle } from '@/components/profiles/title';
import { Button } from '@/components/ui/button';
import { protectRoute } from '@/lib/before-load';
import { createFileRoute } from '@tanstack/react-router';
import { CalendarPlus } from 'lucide-react';

const ProfilePage = () => {
  const { user } = Route.useLoaderData();

  return (
    <ProfileContainer>
      <ProfileTitle username={user.username} />
      <AddSchedule asChild>
        <Button>
          <span className="sr-only">Add schedule</span>
          <CalendarPlus />
        </Button>
      </AddSchedule>
      <ProfileScheduleTable
        isOwner={true}
        userId={user.id}
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
