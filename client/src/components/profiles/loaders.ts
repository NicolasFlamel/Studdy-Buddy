import { fetchUserProfile } from '@/api/fetch';
import { getUserFromClient } from '@/lib/before-load';
import { isExpectedLoaderError } from '@/lib/loader';
import type { RouterContext } from '@/lib/router';
import type {
  ApiResult,
  GetUserProfileByIdData,
} from '@studdy-buddy/shared/types/api';
import { notFound } from '@tanstack/react-router';

type FetchUserProfileResType = ApiResult<GetUserProfileByIdData>;
export const profileLoader = async ({
  context,
}: {
  context: RouterContext;
}) => {
  const user = await getUserFromClient(context.queryClient);

  if (!user) {
    throw new Error('Missing user');
  }

  try {
    const response = await fetchUserProfile(user?.id);

    if (!response.ok) {
      if (response.status === 404) throw notFound();
      console.error(response);
      throw new Error(`Request failed with status ${response.status}`);
    }

    const { data, error }: FetchUserProfileResType = await response.json();

    if (error) throw error;

    return { user: data };
  } catch (error) {
    if (isExpectedLoaderError(error)) throw error;
    console.error(error);
    throw error;
  }
};

type FetchProfilesResType = ApiResult<GetUserProfileByIdData>;
export const profilesLoader = async ({ userId }: { userId: string }) => {
  try {
    const response = await fetchUserProfile(userId);

    if (!response.ok) {
      if (response.status === 404) throw notFound();
      console.error(response);
      throw new Error(`Request failed with status ${response.status}`);
    }

    const { data, error }: FetchProfilesResType = await response.json();

    if (error) throw error;

    return { user: data };
  } catch (error) {
    if (isExpectedLoaderError(error)) throw error;
    console.error(error);
    throw error;
  }
};
