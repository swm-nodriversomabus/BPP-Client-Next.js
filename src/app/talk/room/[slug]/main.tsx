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
import api from '@/utils/api';

const fetcher = (url: RequestInfo | URL) => {
  return fetch(url, {
    credentials: 'include',
  }).then((r) => {
    return r.json();
  });
};

let loadState = false;

let subs: any;

const globalSockData = new Array<object>();
let globalChatText = '';
export default function Main({ slug }: { slug: string }): any {
  const [myInfo, setMyInfo] = useState<JSON | null>(null);
  api('user/id', 'get', {}, [myInfo, setMyInfo]);
  const [chatText, setChatText] = useState('');
  const [sockData, setSockData] = useState(new Array<object>());
  const [scrollHeight, setScrollHeight] = useState<number>(0);

  const [isConnected, setIsConnected] = useState<boolean>(false);

  const getKey = (pageIndex: any, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null;
    const params: Record<string, string> = {
      roomId: slug,
      page: pageIndex,
      size: '10',
    };
    const query = new URLSearchParams(params).toString();
    if (sockData.length) setSockData([]);
    return `${process.env.NEXT_BASE_URL}chat?${query}`;
  };

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

  const myName = 0;

  const scrollRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  let isConnectedDOM: RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);

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
      const sock = new SockJS(`${process.env.NEXT_BASE_URL}ws/chat`);
      return sock;
    });
    client.current.connect({}, () => {
      client.current?.send(`/pub/subscribe/${slug}`, {});
      subs = client.current?.subscribe(
        `/topic/channel/${slug}`,
        (message) => {
          const json = JSON.parse(message.body);
          globalSockData.push({
            senderId: json.senderId,
            content: json.content,
          });
          const copySockData = globalSockData.slice();
          setSockData(copySockData);
        },
        {}
      );
    });
  };

  if (!isConnected) {
    if (subs) subs.unsubscribe();
    connectHandler();
    setIsConnected(true);
  }

  const sendHandler = () => {
    client.current?.send(
      `/pub/chat/${slug}`,
      {},
      JSON.stringify({
        image: false,
        type: 'TALK',
        roomId: slug,
        content: globalChatText,
        readCount: 1,
      })
    );
    setChatText('');
    globalChatText = '';
  };

  const arr: Array<Array<object>> | undefined = data?.slice(0);
  console.log('before', arr);
  if (arr) {
    arr?.reverse();
    arr.forEach((element) => {
      if (element && 'reverse' in element) {
        element.reverse();
      }
    });
  }
  console.log('after', arr);

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
              if (
                msg.senderId.userId ==
                (myInfo && 'text' in myInfo ? myInfo.text : '')
              ) {
                return (
                  <ChatMessage
                    key={i++}
                    received={undefined}
                    timestamp={msg.createdAt}
                  >
                    {msg.content}
                  </ChatMessage>
                );
              } else {
                return (
                  <ChatMessage
                    key={i++}
                    received={msg.senderId.username}
                    timestamp={msg.createdAt}
                  >
                    {msg.content}
                  </ChatMessage>
                );
              }
            });
          })}
          {sockData?.map((msg: any, index) => {
            if (
              msg.senderId.userId ==
              (myInfo && 'text' in myInfo ? myInfo.text : '')
            ) {
              return (
                <ChatMessage
                  key={i++}
                  received={undefined}
                  timestamp={[
                    new Date().getFullYear(),
                    new Date().getMonth() + 1,
                    new Date().getDate(),
                    new Date().getHours(),
                    new Date().getMinutes(),
                  ]}
                >
                  {msg.content}
                </ChatMessage>
              );
            } else {
              return (
                <ChatMessage
                  key={i++}
                  received={msg.senderId.username}
                  timestamp={[
                    new Date().getFullYear(),
                    new Date().getMonth() + 1,
                    new Date().getDate(),
                    new Date().getHours(),
                    new Date().getMinutes(),
                  ]}
                >
                  {msg.content}
                </ChatMessage>
              );
            }
          })}
        </>
      </ChatMessageArea>
      <div className="ChatTool">
        <input
          placeholder="메시지를 입력하세요"
          onChange={chatTextOnChange}
          onKeyDown={(e) => {
            if (e.key == 'Enter') {
              alert('1');
            }
          }}
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
