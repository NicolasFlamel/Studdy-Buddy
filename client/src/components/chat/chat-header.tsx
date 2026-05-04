import { useChat } from '@/context/chat-provider';

interface Props {
  subject: string;
}
export const ChatHeader = ({ subject }: Props) => {
  const { connectedUsername } = useChat();

  return (
    <section className={'bg-card text-center p-8'}>
      <h2>
        Currently Connected Buddy:
        <a
          href="/user/{{chatData.username}}"
          id="buddy"
          data-user-id="{{chatData.userId}}"
          target="_blank"
        >
          {connectedUsername}
        </a>
      </h2>
      <h2>{`Studdy Buddy Subject: ${subject}`}</h2>
    </section>
  );
};
