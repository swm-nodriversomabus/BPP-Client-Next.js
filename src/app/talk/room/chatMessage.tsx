import { UIEventHandler } from 'react';

interface propsType {
  received: string | undefined;
  children: JSX.Element;
}

export default function ChatMessage({ received, children }: propsType) {
  const texts = children + '';
  if (received) return <MessageReceived>{texts}</MessageReceived>;
  else return <MessageSent>{texts}</MessageSent>;
}

const MessageReceived: any = (Props: { children: JSX.Element }) => {
  return (
    <>
      <div className="message received">
        <div></div>
        <div>{Props.children}</div>
      </div>
    </>
  );
};

const MessageSent: any = (Props: { children: JSX.Element }) => {
  return (
    <>
      <div className="message sent">
        <div></div>
        <div>{Props.children}</div>
      </div>
    </>
  );
};
