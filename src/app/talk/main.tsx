'use client';

import './style.css';
import Navbar from '@/component/navigationBar';
import ContentBox from '@/component/contentBox';
import Tabbar from '@/component/tabBar';
import FriendsList, { FriendsListItem } from '@/view/friendsList';
import Link from 'next/link';
import Image from 'next/image';
import newchat from 'public/newchat.svg';
import ModalView from '@/view/modalView';
import { useEffect, useState } from 'react';
import SearchBarFriends from '@/component/searchBarFriends';
import { atom, useRecoilState } from 'recoil';
import useSWR from 'swr';
import { useRouter } from 'next/navigation';
import api, { isMap, mapping } from '@/utils/api';
import FriendsCheckList, {
  FriendsCheckListItem,
} from '@/view/friendsCheckList';

// [
//   {
//     userId: 12,
//     username: '이름',
//     gender: '남성',
//     age: 20,
//     phone: '010-1234-5566',
//     role: '0',
//     blacklist: false,
//     stateMessage: '상태메시지',
//     mannerScore: 0,
//     createdAt: '2023-10-06T13:28:03.476Z',
//     updatedAt: '2023-10-06T13:28:03.476Z',
//     isActive: true,
//   },
// ];

export default function Main(): any {
  const BASE_URL = process.env.NEXT_BASE_URL;

  const router = useRouter();
  const [modalDisplay, setModalDisplay] = useState(false);

  const [myInfo, setMyInfo] = useState<JSON | null>(null);
  api('user/{id}', 'get', {}, [myInfo, setMyInfo]);

  const [friends, setFriends] = useState<JSON | null>(null);
  api('user/{id}/friend', 'get', {}, [friends, setFriends]);

  const setSelectList = (index: number) => {
    const obj: any =
      friends && 'slice' in friends
        ? (friends as { slice: Function }).slice()
        : [];
    obj[index].checked = !obj[index].checked;
    setFriends(obj);
  };

  let index = 0;

  return (
    <>
      <Navbar more segment={{ 친구: '/talk', 채팅: '/talk/list' }}></Navbar>
      <ContentBox>
        <FriendsList>
          <div className="section">
            <FriendsListItem
              link={`talk/profile/${
                myInfo && 'userId' in myInfo ? myInfo.userId : ''
              }`}
              img={0}
              title={myInfo && 'username' in myInfo ? myInfo.username : ''}
              subtitle={
                myInfo && 'stateMessage' in myInfo ? myInfo.stateMessage : ''
              }
            />
          </div>
          <hr />
          <div className="section">
            <h1>친구목록</h1>
            {/* <h2>ㄱ</h2> */}

            {/* <>
              {friends &&
              'length' in friends &&
              'map' in friends &&
              friends.length ? (
                (friends as { map: Function }).map(
                  (item: any, index: number) => {
                    return (
                      <FriendsListItem
                        link={`talk/profile/${item.userId}`}
                        title={item.username}
                        subtitle={item.stateMessage}
                        img={1}
                        key={1}
                      />
                    );
                  }
                )
              ) : (
                <></>
              )}
            </> */}

            <>
              {mapping(friends, (item: any, index: number) => {
                return (
                  <FriendsListItem
                    link={`talk/profile/${item.userId}`}
                    title={item.username}
                    subtitle={item.stateMessage}
                    img={1}
                    key={1}
                  />
                );
              })}
            </>
          </div>
        </FriendsList>
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
          setModalDisplay(true);
        }}
      />
      <ModalView
        display={modalDisplay}
        setDisplay={setModalDisplay}
        title="채팅방 개설"
        button="개설하기"
        onClickProp={() => {
          fetch(`${BASE_URL}chatroom`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              chatroomName: '채팅방 이름 예시',
              type: 'Normal',
              masterId: 1,
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
              fetch(`${BASE_URL}members`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  chatroomId: chatroomID,
                  memberIds: [1, 2, 3],
                }),
              }).then((res) => {
                if (res.status == 200) {
                  router.push(`talk/room/${chatroomID}`);
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
