'use client';

import './style.css';
import { CompatClient, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
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
import ChatMessageArea from '../chatMessageArea';
import ChatMessage from '../chatMessage';
import Image from 'next/image';
import add from 'public/add.svg';

const getKey = (pageIndex: any, previousPageData: any) => {
  if (previousPageData && !previousPageData.length) return null;
  return `http://godjh.dothome.co.kr/api/talk/room/?page=${pageIndex}`;
};

const fetcher = (url: RequestInfo | URL) => fetch(url).then((r) => r.json());

let loadState = false;
let isConnected = false;

const globalSockData = new Array<object>();
let globalChatText = '';
export default function Main({ slug }: { slug: string }): any {
  const [chatText, setChatText] = useState('');
  const [sockData, setSockData] = useState(new Array<object>());

  const { data, size, setSize, mutate }: SWRInfiniteResponse = useSWRInfinite(
    getKey,
    fetcher
  );

  const chatTextOnChange = (e: any) => {
    globalChatText = e.target.value;
    setChatText(e.target.value);
  };

  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 20);

  const myName = 'me';
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
  }, [data, sockData]);

  const client = useRef<CompatClient>();
  const connectHandler = () => {
    client.current = Stomp.over(() => {
      const sock = new SockJS('https://dev.yeohaengparty.com/api/ws/chat');
      return sock;
    });
    client.current.connect({}, () => {
      client.current?.send(`/pub/subscribe/${slug}`, {});
      const subs = client.current?.subscribe(
        `/topic/channel/${slug}`,
        (message) => {
          const json = JSON.parse(message.body);
          globalSockData.push({
            sender: json.sender,
            message: json.message,
          });
          const copySockData = globalSockData.slice();
          setSockData(copySockData);
        },
        {}
      );
      isConnected = true;
    });
  };

  if (!isConnected) connectHandler();

  const sendHandler = () => {
    client.current?.send(
      '/pub/message',
      {},
      JSON.stringify({
        type: 'TALK',
        roomId: slug,
        sender: 'me',
        message: globalChatText,
      })
    );
    setChatText('');
    globalChatText = '';
  };

  const arr: Array<Array<object>> | undefined = data?.slice();
  if (arr) arr?.reverse();

  let i = 0;
  return (
    <>
      <Navbar back=" ">채팅방</Navbar>
      <ChatMessageArea
        onScroll={scrollEvent}
        isReachingEnd={isReachingEnd}
        inheritRef={scrollRef}
      >
        <>
          {arr?.map((msgs, index) => {
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
          {sockData?.map((msg: any, index) => {
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
          })}
        </>
      </ChatMessageArea>
      <div className="ChatTool">
        <input
          placeholder="메시지를 입력하세요"
          onChange={chatTextOnChange}
          value={chatText}
        ></input>
        <Image src={add} alt="add" />
        <button
          onClick={() => {
            sendHandler();
          }}
        >
          전송
        </button>
      </div>
    </>
  );
}
