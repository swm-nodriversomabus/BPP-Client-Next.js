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
import ChatMessageArea from './chatMessageArea';
import ChatMessage from './chatMessage';

const getKey = (pageIndex: any, previousPageData: any) => {
  if (previousPageData && !previousPageData.length) return null;
  return `http://godjh.dothome.co.kr/api/talk/room/?page=${pageIndex}`;
};

const fetcher = (url: RequestInfo | URL) => fetch(url).then((r) => r.json());

const ChatTool: any = () => {
  return (
    <div className="chatTool">
      <input placeholder="some text.."></input>
    </div>
  );
};

let loadState = false;

export default function Home(): any {
  const { data, size, setSize }: SWRInfiniteResponse = useSWRInfinite(
    getKey,
    fetcher
  );

  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 20);

  const myName = 'me';
  const [chatData, setChatData] = useState<Array<Array<object>>>();
  const [scrollHeight, setScrollHeight] = useState<number>(0);

  const scrollRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const scrollEvent = (e: any) => {
    if (
      scrollRef?.current?.scrollTop &&
      scrollRef?.current?.scrollTop < 200 &&
      !loadState
    ) {
      loadState = true;
      setScrollHeight(scrollRef?.current?.scrollHeight);
      setSize(size + 1);
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
          scrollHeight +
          scrollRef.current.scrollTop
      );
      loadState = false;
    }
  }, [chatData]);

  let i = 0;
  return (
    <>
      <Navbar back="Talk">채팅방</Navbar>
      <ChatMessageArea
        onScroll={scrollEvent}
        isReachingEnd={isReachingEnd}
        inheritRef={scrollRef}
      >
        <>
          {chatData?.map((msgs, index) => {
            return msgs?.map((msg: any) => {
              if (msg.sender == myName) {
                return (
                  <ChatMessage key={i++} received={undefined}>
                    {msg.message}
                  </ChatMessage>
                );
              }
              return (
                <ChatMessage key={i++} received={msg.sender}>
                  {msg.message}
                </ChatMessage>
              );
            });
          })}
        </>
      </ChatMessageArea>
      <ChatTool></ChatTool>
    </>
  );
}
