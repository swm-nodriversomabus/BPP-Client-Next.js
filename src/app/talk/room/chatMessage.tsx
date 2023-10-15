import { UIEventHandler } from 'react';
import Image from 'next/image';
import profile0 from 'public/profile0.svg';
import profile9 from 'public/profile9.svg';

interface propsType {
  received: string | undefined;
  children: JSX.Element;
}

export default function ChatMessage({ received, children }: propsType) {
  const texts = children + '';
  if (received)
    return <MessageReceived received={received}>{texts}</MessageReceived>;
  else return <MessageSent>{texts}</MessageSent>;
}

const MessageReceived: any = (Props: propsType) => {
  return (
    <>
      <div className="message received">
        <div>
          <Image
            width={32}
            src={localStorage.getItem('tid') == '1' ? profile0 : profile9}
            alt="image"
          />
        </div>
        <div>{Props.received}</div>
        <div>
          {Props.children}
          <div>오전 09:41</div>
        </div>
      </div>
    </>
  );
};

const MessageSent: any = (Props: { children: JSX.Element }) => {
  return (
    <>
      <div className="message sent">
        <div>
          {Props.children}
          <div>오전 09:41</div>
        </div>
      </div>
    </>
  );
};
