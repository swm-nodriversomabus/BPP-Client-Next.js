/* eslint-disable @next/next/no-img-element */
import { UIEventHandler, useState } from 'react';
import Image from 'next/image';
import emptyProfile from 'public/empty_profile.png';

interface propsType {
  received: string | undefined;
  children: JSX.Element;
  timestamp: number[];
  userId: string;
}

export default function ChatMessage({
  received,
  children,
  timestamp,
  userId,
}: propsType) {
  const texts = children + '';
  if (received)
    return (
      <MessageReceived
        userId={userId}
        received={received}
        timestamp={timestamp}
      >
        {texts}
      </MessageReceived>
    );
  else
    return (
      <MessageSent userId={userId} timestamp={timestamp}>
        {texts}
      </MessageSent>
    );
}

const MessageReceived: any = (Props: propsType) => {
  const [isImage, setIsImage] = useState(true);
  const BASE_URL: string = process.env.NEXT_BASE_URL
    ? process.env.NEXT_BASE_URL
    : '';

  return (
    <>
      <div className="message received">
        <div>
          {isImage ? (
            <img
              src={Props.userId ? BASE_URL + 'user/image/' + Props.userId : ''}
              onError={(e) => {
                setIsImage(false);
              }}
              width={32}
              height={32}
              alt="image"
            />
          ) : (
            <Image src={emptyProfile} width={32} height={32} alt="image" />
          )}
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
