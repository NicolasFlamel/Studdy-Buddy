import { protectRoute } from '@/lib/before-load';
import { createFileRoute } from '@tanstack/react-router';

const ProfilePage = () => {
  return <main className={'grow p-2'}>Hello "/profile"!</main>;
};

export const Route = createFileRoute('/profile')({
  component: ProfilePage,
  beforeLoad: async ({ context, location }) => {
    await protectRoute(context.queryClient, location);
  },
});
