'use client';

import './style.css';
import Navbar from '@/component/navigationBar';
import ContentBox from '@/component/contentBox';
import useSWRInfinite, { SWRInfiniteResponse } from 'swr/infinite';
import {
  DOMElement,
  MutableRefObject,
  Ref,
  RefAttributes,
  RefCallback,
  RefObject,
  UIEventHandler,
  useEffect,
  useState,
} from 'react';
import { useRef } from 'react';

const getKey = (pageIndex: any, previousPageData: any) => {
  if (previousPageData && !previousPageData.length) return null;
  return `http://godjh.dothome.co.kr/api/talk/room/?page=${pageIndex}`;
};

const fetcher = (url: RequestInfo | URL) => fetch(url).then((r) => r.json());
interface propsType {
  children: JSX.Element;
  onScroll: UIEventHandler;
  onClick: UIEventHandler;
  inheritRef: any;
}

const ChatMessageArea: any = ({
  children,
  onScroll,
  onClick,
  inheritRef,
}: propsType) => {
  return (
    <div
      onClick={onClick}
      onScroll={onScroll}
      className="chatMessageArea"
      ref={inheritRef}
    >
      {children}
    </div>
  );
};

const ChatMessage: any = (Props: {
  received: string | undefined;
  children: JSX.Element;
}) => {
  const texts = Props.children + '';
  if (Props.received) return <MessageReceived>{texts}</MessageReceived>;
  else return <MessageSent>{texts}</MessageSent>;
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

let loadState = false;

export default function Home(): any {
  // 임시 더미 넣으려고 let으로 바꿔둠.. const로 바꾸기
  const { data, size, setSize }: SWRInfiniteResponse = useSWRInfinite(
    getKey,
    fetcher
  );

  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 20);

  const myName = 'me';
  const [chatData, setChatData] = useState<Array<Array<object>>>();

  const scrollRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const scrollEvent = (e: any) => {
    if (
      scrollRef?.current?.scrollTop &&
      scrollRef?.current?.scrollTop < 200 &&
      !loadState
    ) {
      loadState = true;
      localStorage.setItem('currentScrollHeight', e.currentTarget.scrollHeight);
      setSize(size + 1);
      console.log(size);
    }
  };

  useEffect(() => {
    const arr: Array<Array<object>> | undefined = data?.slice();
    if (arr) setChatData(arr?.reverse());
  }, [data]);

  useEffect(() => {
    if (
      scrollRef?.current &&
      scrollRef?.current?.scrollHeight <=
        scrollRef?.current?.offsetHeight + 200 &&
      !loadState
    ) {
      loadState = true;
      setSize(size + 1);
    } else if (scrollRef) {
      scrollRef.current?.scrollTo(
        0,
        scrollRef.current.scrollHeight -
          Number(localStorage.getItem('currentScrollHeight')) +
          scrollRef.current.scrollTop
      );
      loadState = false;
    }
  }, [chatData]);

  if (!chatData) return 'loading';

  return (
    <>
      <Navbar back="Talk">채팅방</Navbar>
      <ContentBox>
        <ChatMessageArea
          className="chatMessageArea"
          onScroll={scrollEvent}
          isReachingEnd={isReachingEnd}
          inheritRef={scrollRef}
        >
          {chatData.map((msgs, index) => {
            return msgs?.map((msg: any) => {
              if (msg.sender == myName) {
                return <ChatMessage key={msg.id}>{msg.message}</ChatMessage>;
              }
              return (
                <ChatMessage key={msg.id} received={msg.sender}>
                  {msg.message}
                </ChatMessage>
              );
            });
          })}
        </ChatMessageArea>
      </ContentBox>
      <ChatTool></ChatTool>
    </>
  );
}
