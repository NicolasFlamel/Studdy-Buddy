import { fetchChatMetadataWithId } from '@/api/fetch';
import { Chat } from '@/components/chat/chat-page';
import { ChatNotFound } from '@/components/chat/not-found';
import { ChatProvider } from '@/context/chat-provider';
import { useAuthQuery } from '@/hooks/auth.query';
import { protectRoute } from '@/lib/before-load';
import { isExpectedLoaderError } from '@/lib/loader';
import type {
  ApiResult,
  GetChatMetadataData,
} from '@studdy-buddy/shared/types/api';
import { createFileRoute, notFound } from '@tanstack/react-router';

const ChatPage = () => {
  const { data } = useAuthQuery();
  const { chatId } = Route.useParams();
  const { chat } = Route.useLoaderData();

  if (!data) throw new Error('Data is suppose to exist.');

  const connectedUser = getConnectedUser(chat, data.id);

  return (
    <ChatProvider chatId={chatId} initialConnectedUser={connectedUser}>
      <Chat subject={chat.subject} />
    </ChatProvider>
  );
};

const getConnectedUser = (chat: GetChatMetadataData, userId: string) => {
  if (userId !== chat.host.id) return chat.host;
  else if (chat.claimer && userId !== chat.claimer.id) return chat.claimer;
  return null;
};

type ResType = ApiResult<GetChatMetadataData>;
export const Route = createFileRoute('/chats/$chatId')({
  component: ChatPage,
  beforeLoad: async ({ context, location }) => {
    await protectRoute(context.queryClient, location);
  },
  loader: async ({ params: { chatId } }) => {
    try {
      const response = await fetchChatMetadataWithId(chatId);

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
