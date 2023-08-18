'use client';

import './style.css';
import Navbar from '@/component/navigationBar';
import ContentBox from '@/component/contentBox';
import Tabbar from '@/component/tabBar';
import ListView, { ListItem, ListItemAddToRoom } from '@/view/listView';
import Link from 'next/link';
import useSWRInfinite, { SWRInfiniteResponse } from 'swr/infinite';
import { RefObject, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import newchat from 'public/newchat.svg';
import ModalView from '@/view/modalView';
import SearchBarFriends from '@/component/searchBarFriends';

const getKey = (pageIndex: any, previousPageData: any) => {
  if (previousPageData && !previousPageData.length) return null;
  return `https://dev.yeohaengparty.com/api/chatroom?userid=1&page=${pageIndex}&size=10`;
  // return `http://godjh.dothome.co.kr/api/talk/list/?page=${pageIndex}`;
};

const fetcher = (url: RequestInfo | URL) => fetch(url).then((r) => r.json());

let loadState: boolean = false;
export default function Home(): any {
  const { data, size, setSize }: SWRInfiniteResponse = useSWRInfinite(
    getKey,
    fetcher
  );
  const scrollRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const scrollEvent = (e: any) => {
    if (
      scrollRef?.current &&
      scrollRef.current.scrollHeight -
        scrollRef.current.clientHeight -
        scrollRef.current.scrollTop <
        100 &&
      !loadState
    ) {
      loadState = true;
      setSize(size + 1);
    }
  };

  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 20);

  const [modalDisplay, setModlaDisplay] = useState(false);

  const [friendSelectList, setFriendSelectList] = useState([
    { title: '킹용명', subtitle: '용용용', checked: false },
    { title: '킹용명', subtitle: '용용용', checked: false },
    { title: '킹용명', subtitle: '용용용', checked: false },
    { title: '킹용명', subtitle: '용용용', checked: false },
    { title: '킹용명', subtitle: '용용용', checked: false },
    { title: '킹용명', subtitle: '용용용', checked: false },
    { title: '킹용명', subtitle: '용용용', checked: false },
    { title: '킹용명', subtitle: '용용용', checked: false },
  ]);

  const setFriendSelectListCheck = (index: number) => {
    const obj = friendSelectList.slice();
    obj[index].checked = !obj[index].checked;
    setFriendSelectList(obj);
  };

  let index = 0;

  useEffect(() => {
    if (
      scrollRef?.current &&
      scrollRef?.current?.scrollHeight <=
        scrollRef?.current?.offsetHeight + 200 &&
      !loadState
    ) {
      loadState = true;
      setSize(size + 1);
    }
    loadState = false;
  }, [data]);

  let i = 0;

  return (
    <>
      <Navbar
        more
        segment={{ 친구: '/talk', '채팅 (99+)': '/talk/list' }}
        segmentIndex="1"
      ></Navbar>
      <ContentBox
        withSegment={true}
        onScroll={scrollEvent}
        isReachingEnd={isReachingEnd}
        inheritRef={scrollRef}
      >
        <ListView>
          <div className="section">
            <>
              {data?.map((msgs, index) => {
                return msgs?.map((msg: any) => {
                  if (msg.isActive == false) return <></>;
                  return (
                    <ListItem
                      link={`room?${msg.chatroomID}`}
                      key={i++}
                      title={`${msg.chatroomName}`}
                      subtitle={'last message..'}
                    />
                  );
                });
              })}
            </>
          </div>
          <div className="listMargin"></div>
        </ListView>
      </ContentBox>
      <Image
        src={newchat}
        alt="new chat"
        style={{
          cursor: 'pointer',
          position: 'absolute',
          bottom: '76px',
          right: '16px',
        }}
        onClick={() => {
          setModlaDisplay(true);
        }}
      />
      <ModalView
        display={modalDisplay}
        setDisplay={setModlaDisplay}
        title="채팅방 개설"
        button="개설하기"
        link="room"
      >
        <SearchBarFriends />
        <div
          style={{
            overflowX: 'hidden',
            overflowY: 'auto',
            position: 'relative',
            width: '100%',
            height: '450px',
            top: '0px',
            left: '0px',
          }}
        >
          <ListView>
            <div className="section">
              {friendSelectList?.map((item) => {
                return (
                  <ListItemAddToRoom
                    link="room"
                    key={index}
                    index={index++}
                    title={item.title}
                    subtitle={item.subtitle}
                    checked={item.checked}
                    set={setFriendSelectListCheck}
                  />
                );
              })}
            </div>
          </ListView>
        </div>
      </ModalView>
      <Tabbar>2</Tabbar>
    </>
  );
}
