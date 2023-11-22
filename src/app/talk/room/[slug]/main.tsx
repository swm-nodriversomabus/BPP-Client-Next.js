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

let loadState = false;

let subs: any;

let sock: any;

let globalSockData = new Array<object>();
let globalChatText = '';

export default function Main({ slug }: { slug: string }): any {
  const [myInfo, setMyInfo] = useState<JSON | null>(null);
  api('user/id', 'get', {}, [myInfo, setMyInfo]);
  const [chatText, setChatText] = useState('');
  const [sockData, setSockData] = useState(new Array<object>());
  const [scrollHeight, setScrollHeight] = useState<number>(0);

  const [isConnected, setIsConnected] = useState<boolean>(false);

  const fetcher = (url: RequestInfo | URL) => {
    globalSockData = [];
    if (sockData.length) setSockData([]);
    return fetch(url, {
      credentials: 'include',
    }).then((r) => {
      return r.json();
    });
  };

  const getKey = (pageIndex: any, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null;
    const params: Record<string, string> = {
      roomId: slug,
      page: pageIndex,
      size: '10',
    };
    const query = new URLSearchParams(params).toString();
    return `${process.env.NEXT_BASE_URL}chat?${query}`;
  };

  const { data, size, setSize }: SWRInfiniteResponse = useSWRInfinite(
    getKey,
    fetcher,
    {
      revalidateOnFocus: false,
      compare: (a, b) => {
        if (!a && !b) return true;
        if (a === b) {
          if ('length' in a && 'length' in b && a.length === b.length) {
            if (a.length === 0) {
              return true;
            }
            if (
              'length' in a[0] &&
              'length' in b[0] &&
              a[0].length === b[0].length
            ) {
              if (a[0].length === 0) {
                return true;
              }
              if (!('createdAt' in a[0][0]) && !('createdAt' in b[0][0])) {
                return true;
              }
              if (
                'createdAt' in a[0][0] &&
                'createdAt' in b[0][0] &&
                a[0][0].createdAt[0] == b[0][0].createdAt[0] &&
                a[0][0].createdAt[1] == b[0][0].createdAt[1] &&
                a[0][0].createdAt[2] == b[0][0].createdAt[2] &&
                a[0][0].createdAt[3] == b[0][0].createdAt[3] &&
                a[0][0].createdAt[4] == b[0][0].createdAt[4] &&
                a[0][0].createdAt[5] == b[0][0].createdAt[5] &&
                a[0][0].createdAt[6] == b[0][0].createdAt[6]
              ) {
                return true;
              }
            }
          }
        }
        return false;
      },
    }
  );

  const chatTextOnChange = (e: any) => {
    globalChatText = e.target.value;
    setChatText(e.target.value);
  };

  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 20);

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
      globalSockData = [];
      if (sockData.length) setSockData([]);
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
      // 위로 스크롤해서 이전 데이터 불러오기 trigger
      loadState = true;
      globalSockData = [];
      if (sockData.length) setSockData([]);
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
    if (sock) {
      console.log('socket close');
      sock.close();
      globalSockData = [];
      if (sockData.length) setSockData([]);
    }
    client.current = Stomp.over(() => {
      sock = new SockJS(`${process.env.NEXT_BASE_URL}ws/chat`);
      return sock;
    });
    client.current.connect({}, () => {
      client.current?.send(`/pub/subscribe/${slug}`, {});
      subs = client.current?.subscribe(
        `/topic/channel/${slug}`,
        (message) => {
          const json = JSON.parse(message.body);
          globalSockData.push({
            senderId: {
              username: json.senderId.username,
              userId: json.senderId.userId,
            },
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
          {[...(data ? data : [])].reverse().map((msgs, index) => {
            return [...(msgs ? msgs : [])].reverse().map((msg: any) => {
              let utcTime = new Date(
                `${msg.createdAt[0]}-${(100 + msg.createdAt[1])
                  .toString()
                  .substring(1)}-${(100 + msg.createdAt[2])
                  .toString()
                  .substring(1)}T${(100 + msg.createdAt[3])
                  .toString()
                  .substring(1)}:${(100 + msg.createdAt[4])
                  .toString()
                  .substring(1)}:00`
              );
              utcTime = new Date(utcTime.getTime() + 1000 * 60 * 60 * 9);
              msg.localTime = [
                utcTime.getFullYear(),
                utcTime.getMonth() + 1,
                utcTime.getDate(),
                utcTime.getHours(),
                utcTime.getMinutes(),
              ];
              if (
                msg.senderId.userId ==
                (myInfo && 'text' in myInfo ? myInfo.text : '')
              ) {
                return (
                  <ChatMessage
                    key={i++}
                    received={undefined}
                    timestamp={msg.localTime}
                    userId={msg.senderId.userId}
                  >
                    {msg.content}
                  </ChatMessage>
                );
              } else {
                return (
                  <ChatMessage
                    key={i++}
                    received={msg.senderId.username}
                    timestamp={msg.localTime}
                    userId={msg.senderId.userId}
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
                  userId={msg.senderId.userId}
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
                  userId={msg.senderId.userId}
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
              sendHandler();
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
