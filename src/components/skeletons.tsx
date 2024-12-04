import ChatBubble from './chat/chat-bubble';
import { Skeleton } from '@nextui-org/react';

// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export const AssessmentEditFormSkeleton = () => {
  return <div className={shimmer + ''}></div>;
};

export const ChatSkeleton = () => {
  return (
    <div>
      <div>
        <ChatBubble self>
          <Skeleton className="rounded-lg">Loading...</Skeleton>
        </ChatBubble>
      </div>
      <div>
        <ChatBubble>
          <Skeleton className="rounded-lg">Loading...</Skeleton>
        </ChatBubble>
      </div>
    </div>
  );
};
