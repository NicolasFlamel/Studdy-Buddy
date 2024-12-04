import { HTMLAttributes } from 'react';

interface ChatBubbleProps extends HTMLAttributes<HTMLDivElement> {
  self?: boolean;
  children?: React.ReactNode;
}
interface CornerProps {
  color: string;
}
const LeftCorner = ({ color }: CornerProps) => {
  return (
    <div className="w-3 overflow-hidden">
      <div
        className={
          color +
          ' h-4 bg-content2 rotate-45 transform origin-bottom-right rounded-sm'
        }
      ></div>
    </div>
  );
};

const RightCorner = ({ color }: CornerProps) => {
  return (
    <div className="w-3 overflow-hidden ">
      <div
        className={
          color +
          ' h-4 bg-content4 rotate-45 transform origin-top-left rounded-sm'
        }
      ></div>
    </div>
  );
};
const ChatBubble = ({
  self = false,
  children,
  className,
  ...divProps
}: ChatBubbleProps) => {
  const leftClassName = 'flex items-center justify-start';
  const rightClassName = 'flex items-center justify-end';
  const containerClassName =
    (self ? rightClassName : leftClassName) +
    (className ? ` ${className}` : '');
  const color = self ? 'bg-content4' : 'bg-content2';

  return (
    <div className={containerClassName} {...divProps}>
      {!self && <LeftCorner color={color} />}
      <p className={'p-4 my-2 rounded-lg max-w-[90%] ' + color}>{children}</p>
      {self && <RightCorner color={color} />}
    </div>
  );
};

export default ChatBubble;
