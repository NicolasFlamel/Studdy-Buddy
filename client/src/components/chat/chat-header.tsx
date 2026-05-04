import { useChat } from '@/context/chat-provider';

interface Props {
  subject: string;
  username?: string;
}
export const ChatHeader = ({ subject, username }: Props) => {
  const { connectedUsername } = useChat();

  return (
    <section className={'bg-card rounded-md shadow-md text-center p-8'}>
      <h2>
        Currently Connected Buddy:
        <a href={'/profile/' + username} target="_blank">
          {connectedUsername}
        </a>
      </h2>
      <h2>{`Studdy Buddy Subject: ${subject}`}</h2>
    </section>
  );
};
