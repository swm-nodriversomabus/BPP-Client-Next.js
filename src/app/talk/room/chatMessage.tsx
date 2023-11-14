import { UIEventHandler } from 'react';
import Image from 'next/image';
import emptyProfile from 'public/empty_profile.png';

interface propsType {
  received: string | undefined;
  children: JSX.Element;
  timestamp: number[];
}

export default function ChatMessage({
  received,
  children,
  timestamp,
}: propsType) {
  const texts = children + '';
  if (received)
    return (
      <MessageReceived received={received} timestamp={timestamp}>
        {texts}
      </MessageReceived>
    );
  else return <MessageSent timestamp={timestamp}>{texts}</MessageSent>;
}

const MessageReceived: any = (Props: propsType) => {
  return (
    <>
      <div className="message received">
        <div>
          <Image width={32} src={emptyProfile} alt="image" />
        </div>
        <div>{Props.received}</div>
        <div>
          {Props.children}
          <div>{`${Props.timestamp[3] < 12 ? '오전' : '오후'} ${(
            ((Props.timestamp[3] + 11) % 12) +
            101
          )
            .toString()
            .substring(1)}:${(Props.timestamp[4] + 100)
            .toString()
            .substring(1)}`}</div>
        </div>
      </div>
    </>
  );
};

const MessageSent: any = (Props: {
  children: JSX.Element;
  timestamp: number[];
}) => {
  return (
    <>
      <div className="message sent">
        <div>
          {Props.children}
          <div>{`${Props.timestamp[3] < 12 ? '오전' : '오후'} ${(
            ((Props.timestamp[3] + 11) % 12) +
            101
          )
            .toString()
            .substring(1)}:${(Props.timestamp[4] + 100)
            .toString()
            .substring(1)}`}</div>
        </div>
      </div>
    </>
  );
};
