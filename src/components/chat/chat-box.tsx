'use client';

import ChatBubble from './chat-bubble';

const Chat = () => {
  return <ChatBox />;
};

const ChatBox = () => {
  const lengthTest = 50;

  return (
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
  );
};

export default Chat;
