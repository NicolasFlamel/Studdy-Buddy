import { findChat } from '@/api/fetch';
import { Spinner } from '@/components/ui/spinner';
import type {
  ApiResult,
  MatchPostChatsData,
} from '@studdy-buddy/shared/types/api';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

type ResType = ApiResult<MatchPostChatsData>;

const RouteComponent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    let timeout: ReturnType<typeof setTimeout>;

    const search = async () => {
      const res = await findChat({ signal: controller.signal });

      if (res.status === 204) {
        timeout = setTimeout(search, 3000);
        return;
      }

      const { data, error }: ResType = await res.json();

      if (error) {
        timeout = setTimeout(search, 3000);
        return;
      }

      navigate({ to: '/chats/$chatId', params: { chatId: data.id } });
    };

    search();

    return () => {
      controller.abort('Component unmounted');
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <main className={'grow relative'}>
      <div>
        <span className={'sr-only'}>Searching...</span>
        <Spinner
          className={
            'fixed left-1/2 top-1/2 size-1/3 -translate-1/2 opacity-80'
          }
        />
      </div>
    </main>
  );
};

export const Route = createFileRoute('/chats/search')({
  component: RouteComponent,
});
