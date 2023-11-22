'use client';

import './style.css';
import Navbar from '@/component/navigationBar';
import ContentBox from '@/component/contentBox';
import Tabbar from '@/component/tabBar';
import FriendsCheckList, {
  FriendsCheckListItem,
} from '@/view/friendsCheckList';
import Link from 'next/link';
import useSWRInfinite, { SWRInfiniteResponse } from 'swr/infinite';
import { RefObject, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import newchat from 'public/newchat.svg';
import ModalView from '@/view/modalView';
import SearchBarFriends from '@/component/searchBarFriends';
import { useRouter } from 'next/navigation';
import api from '@/utils/api';
import TalkList, { TalkListItem } from '@/view/talkList';

const getKey = (pageIndex: any, previousPageData: any) => {
  if (previousPageData && !previousPageData.length) return null;
  return `${process.env.NEXT_BASE_URL}chatroom?page=${pageIndex}&size=10`;
};

const fetcher = (url: RequestInfo | URL) => {
  return fetch(url, {
    credentials: 'include',
  }).then((r) => {
    return r.json();
  });
};

let loadState: boolean = false;
export default function Home(): any {
  const router = useRouter();
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

  const [friends, setFriends] = useState<JSON | null>(null);
  api('user/friend', 'get', {}, [friends, setFriends]);

  const setSelectList = (index: number) => {
    const obj: any =
      friends && 'slice' in friends
        ? (friends as { slice: Function }).slice()
        : [];
    obj[index].checked = !obj[index].checked;
    setFriends(obj);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  let i = 0;

  return (
    <>
      <Navbar
        more
        segment={{ 친구: '/talk', 채팅: '/talk/list' }}
        segmentIndex="1"
      ></Navbar>
      <ContentBox
        withSegment={true}
        onScroll={scrollEvent}
        isReachingEnd={isReachingEnd}
        inheritRef={scrollRef}
      >
        <TalkList>
          <div className="section">
            <>
              {data && 'length' in data && data.length ? (
                data?.map((msgs, index) => {
                  return msgs?.map((msg: any) => {
                    console.log(msg);
                    if (msg.isActive == false) return <></>;
                    return (
                      <TalkListItem
                        img={1}
                        link={`room/${msg.chatroomId}`}
                        key={i++}
                        title={`${msg.chatroomName}`}
                        subtitle={'last message..'}
                      />
                    );
                  });
                })
              ) : (
                <div
                  style={{
                    textAlign: 'center',
                    color: '#bbb',
                    fontSize: '17px',
                    fontWeight: 'bold',
                    margin: '0',
                    paddingTop: 'calc(50vh - 140px)',
                    cursor: 'default',
                  }}
                >
                  친구와 여행 이야기를 시작해보세요
                </div>
              )}
            </>
          </div>
          <div className="listMargin"></div>
        </TalkList>
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
        onClickProp={() => {
          fetch(`${process.env.NEXT_BASE_URL}chatroom`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
              chatroomName: '채팅방 이름 예시',
              type: 'Normal',
              isActive: true,
            }),
          })
            .then((res) => {
              if (res.status == 200) {
                return res.json();
              }
            })
            .then((res) => {
              let chatroomID = res;
              fetch(`${process.env.NEXT_BASE_URL}members`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                  chatroomId: chatroomID,
                  memberIds: [1, 2, 3],
                }),
              }).then((res) => {
                if (res.status == 200) {
                  router.push(`room/${chatroomID}`);
                }
              });
            });
        }}
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
          <FriendsCheckList>
            <div className="section">
              {friends &&
              'length' in friends &&
              'map' in friends &&
              friends.length ? (
                (friends as { map: Function }).map((item: any) => {
                  return (
                    <FriendsCheckListItem
                      link="room"
                      key={index}
                      index={index++}
                      title={item.username}
                      subtitle={item.stateMessage}
                      checked={item.checked}
                      img={1}
                      set={setSelectList}
                    />
                  );
                })
              ) : (
                <></>
              )}
            </div>
          </FriendsCheckList>
        </div>
      </ModalView>
      <Tabbar>2</Tabbar>
    </>
  );
}
