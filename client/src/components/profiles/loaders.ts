import { fetchUserProfile } from '@/api/fetch';
import { scheduleOptions } from '@/hooks/schedule.query';
import { getUserFromClient } from '@/lib/before-load';
import { isExpectedLoaderError } from '@/lib/loader';
import type { RouterContext } from '@/lib/router';
import type {
  ApiResult,
  GetUserPublicByIdData,
} from '@studdy-buddy/shared/types/api';
import type { QueryClient } from '@tanstack/react-query';
import { notFound } from '@tanstack/react-router';

type FetchUserPublicResType = ApiResult<GetUserPublicByIdData>;
export const profileLoader = async ({
  context,
}: {
  context: RouterContext;
}) => {
  const { queryClient } = context;
  const user = await getUserFromClient(context.queryClient);

  if (!user) {
    throw new Error('Missing user');
  }

  return profilesLoader({ userId: user.id, queryClient });
};

type ProfilesLoaderArgs = { userId: string; queryClient: QueryClient };
export const profilesLoader = async ({
  userId,
  queryClient,
}: ProfilesLoaderArgs) => {
  try {
    const queryOptions = scheduleOptions(userId);
    const schedulesPromise = queryClient.ensureQueryData(queryOptions);
    const userRes = await fetchUserProfile(userId);

    if (!userRes.ok) {
      if (userRes.status === 404) throw notFound();
      console.error(userRes);
      throw new Error(`Request failed with status ${userRes.status}`);
    }

    const userAPIRes: FetchUserPublicResType = await userRes.json();

    if (userAPIRes.error) throw userAPIRes.error;

    await schedulesPromise;

    return { user: userAPIRes.data };
  } catch (error) {
    if (isExpectedLoaderError(error)) throw error;
    console.error(error);
    throw error;
  }
};
