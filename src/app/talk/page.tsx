import "./style.css";
import Navbar from "@/(component)/navigationBar";
import ContentBox from "@/(component)/contentBox";
import Tabbar from "@/(component)/tabBar";
import ListView from "@/(view)/listView";
import Link from "next/link";

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
  return <div className="message received">{Props.children}</div>;
};

const MessageSent: any = (Props: { children: JSX.Element }) => {
  return <div className="message sent">{Props.children}</div>;
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
      <Navbar more>Talk</Navbar>
      <ContentBox>
        <ListView>
          <div className="section">
            <Link href="talk/room">ABC</Link>
            <Link href="talk/room">도레미</Link>
            <Link href="talk/room">처럼 착했던 나</Link>
          </div>
        </ListView>
      </ContentBox>
      <Tabbar>2</Tabbar>
    </>
  );
}
