import { fetchChatMetadataWithId } from '@/api/fetch';
import { Chat } from '@/components/chat/chat-page';
import { ChatNotFound } from '@/components/chat/not-found';
import { ChatProvider } from '@/context/chat-provider';
import { protectRoute } from '@/lib/before-load';
import { isExpectedLoaderError } from '@/lib/loader';
import type {
  ApiResult,
  GetChatMetadataData,
} from '@studdy-buddy/shared/types/api';
import { createFileRoute, notFound } from '@tanstack/react-router';

const ChatPage = () => {
  const { chatId } = Route.useParams();
  const { chat } = Route.useLoaderData();

  return (
    <ChatProvider chatId={chatId}>
      <Chat subject={chat.subject} />
    </ChatProvider>
  );
};

type ResType = ApiResult<GetChatMetadataData>;
export const Route = createFileRoute('/chats/$chatId')({
  component: ChatPage,
  beforeLoad: async ({ context, location }) => {
    await protectRoute(context.queryClient, location);
  },
  loader: async ({ abortController, params: { chatId } }) => {
    try {
      const response = await fetchChatMetadataWithId(chatId, {
        signal: abortController.signal,
      });

      if (!response.ok) {
        if (response.status === 404) throw notFound();
        console.error(response);
        throw new Error(`Request failed with status ${response.status}`);
      }

      const { data, error }: ResType = await response.json();

      if (error) throw error;

      return { chat: data };
    } catch (error) {
      if (isExpectedLoaderError(error)) throw error;
      console.error(error);
      throw error;
    }
  },
  notFoundComponent: ChatNotFound,
});
