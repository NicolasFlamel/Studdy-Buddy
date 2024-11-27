import { NextPageProps } from 'types/nextJsTypes';
import SearchingModal from 'components/chat/searching-modal';
import { Modal } from '@nextui-org/modal';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { Card, CardBody, CardFooter } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import ChatBubble from 'components/chat/chat-bubble';

const ChatPage = async ({ searchParams }: NextPageProps) => {
  const lengthTest = 50;
  const params = await searchParams;
  const isOpen = false;

  if (!params.type || !params.subject) throw 'Missing params';

  return (
    <article className="m-4 gap-4 h-[75vh] grid grid-rows-[max-content_1fr]">
      {/* {{! second user information }} */}
      <Card>
        <CardBody className="text-center">
          <h2>
            Currently Connected Buddy:
            <a
              href="/user/{{chatData.username}}"
              data-user-id="{{chatData.userId}}"
              target="_blank"
            >{`{chatData.username}`}</a>
          </h2>
          <h2>Studdy Buddy Subject: {params.subject}</h2>
        </CardBody>
      </Card>
      {/* {{! chat window }} */}
      <Card className="h-full">
        <CardBody className="overflow-y-scroll">
          <ul>
            {Array.from({ length: lengthTest }, (_, i) => i).map((i) => (
              <li key={i}>
                <ChatBubble self={i % 2 ? false : true}>
                  {i % 2
                    ? 'Nulla ultrices nec tortor vitae posuere. Fusce porta, libero in rhoncus pellentesque, nunc lacus laoreet odio, vitae efficitur arcu leo quis lorem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eu libero ullamcorper, semper sem ac, scelerisque libero. Maecenas id magna viverra, iaculis lectus eget, tincidunt enim. In vulputate nulla scelerisque risus tincidunt, non faucibus dolor pharetra. Nulla vitae metus congue, lacinia lacus at, venenatis quam.'
                    : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id cursus erat. Nulla pellentesque lorem diam, at sodales quam tempus eget. Nulla venenatis est mi, in vestibulum magna imperdiet sed. Maecenas tincidunt nunc aliquam sollicitudin tempus. Fusce semper elit urna, vitae sagittis quam ullamcorper porta. Etiam interdum tincidunt enim vel venenatis. Vestibulum volutpat mauris eu consequat sollicitudin. Mauris finibus, orci ut efficitur scelerisque, nibh orci sodales eros, in tempor eros magna a velit. Donec tempus dui cursus, ullamcorper nibh sit amet, tristique velit. Nullam vel hendrerit erat. '}
                </ChatBubble>
              </li>
            ))}
          </ul>
        </CardBody>
        <Divider />
        <CardFooter className="overflow-visible">
          <Input
            type="text"
            autoFocus
            label="Message"
            placeholder="Start typing here"
            className="mx-4"
          />
          <Button>Send</Button>
        </CardFooter>
      </Card>
      {/* Search Modal */}
      <Modal
        isOpen={isOpen}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <SearchingModal found={false} />
      </Modal>
    </article>
  );
};

export default ChatPage;
