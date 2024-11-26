import { NextPageProps } from 'types/nextJsTypes';
import SearchingModal from 'components/chat/searching-modal';
import { Modal } from '@nextui-org/modal';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { Card, CardBody, CardFooter } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';

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
        <CardBody>
          <ul className="overflow-y-scroll">
            <li className="self bg-background">
              {"You have joined the chat as 'Ornaolyp'."}
            </li>
            {Array.from({ length: lengthTest }, (_, i) => i).map((i) => (
              <li key={i} className="buddy">
                {'Kertasma just joined the chat!'}
              </li>
            ))}
          </ul>
        </CardBody>
        <Divider />
        <CardFooter>
          <Input
            type="text"
            autoFocus
            label="Message"
            placeholder="Start typing here"
            className="m-4"
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
