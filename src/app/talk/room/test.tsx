import './style.css';
import Navbar from '@/component/navigationBar';
import ContentBox from '@/component/contentBox';

interface propsType {
  children: JSX.Element;
}

const ChatMessageArea: any = ({ children }: propsType) => {
  return <div className="chatMessageArea">{children}</div>;
};

const ChatMessage: any = (Props: {
  received: string | undefined;
  children: JSX.Element;
}) => {
  if (Props.received)
    return <MessageReceived>{Props.children}</MessageReceived>;
  else return <MessageSent>{Props.children}</MessageSent>;
};

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

const ChatTool: any = () => {
  return (
    <div className="chatTool">
      <input placeholder="some text.."></input>
    </div>
  );
};

export default function Home(): any {
  return (
    <>
      <Navbar back="Talk">채팅방</Navbar>
      <ContentBox>
        <ChatMessage received="h">
          Hey
          <br />
          a;lsdfkjdfdddfsfdfadsfasdfasdfadsfasdfsdfasdfasdfdfdㅇㄹㄴㅁㄹ
        </ChatMessage>
        <ChatMessage>Hi</ChatMessage>
        <ChatMessage received="h">Hello</ChatMessage>
      </ContentBox>
      <ChatTool></ChatTool>
    </>
  );
}
