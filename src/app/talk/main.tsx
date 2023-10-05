'use client';

import './style.css';
import Navbar from '@/component/navigationBar';
import ContentBox from '@/component/contentBox';
import Tabbar from '@/component/tabBar';
import ListView, { ListItem, ListItemAddToRoom } from '@/view/listView';
import Link from 'next/link';
import Image from 'next/image';
import newchat from 'public/newchat.svg';
import ModalView from '@/view/modalView';
import { useState } from 'react';
import SearchBarFriends from '@/component/searchBarFriends';
import { atom, useRecoilState } from 'recoil';
import useSWR from 'swr';
import { useRouter } from 'next/navigation';
import { api } from '@/utils/api';

// let friendsData: Array<object> = [
//   {
//     img: 1,
//     title: 'ENTP남',
//     subtitle: '대문자 P',
//   },
//   { img: 2, title: '곽튜브', subtitle: '이거 재밌네?', checked: false },
//   { img: 3, title: '또떠녀', subtitle: '또 떠나는 여행', checked: false },
//   { img: 4, title: '소마소마', subtitle: '14기 화이팅!', checked: false },
//   {
//     img: 6,
//     title: '마에스트로',
//     subtitle: '불러 maestro maestro',
//     checked: false,
//   },
//   { img: 5, title: '효남이', subtitle: '냥냥펀치', checked: false },
//   { img: 7, title: '파리지앵', subtitle: '파리바게뜨', checked: false },
//   { img: 8, title: '킹갓엠퍼러용명', subtitle: '상메는 상메', checked: false },
// ];

let userId = 1;
let loadState = false;
export default function Main(): any {
  const router = useRouter();
  const [modalDisplay, setModalDisplay] = useState(false);

  const [friendsData, setFriendsData] = useState([]);
  const [friendSelectList, setFriendSelectList] = useState([]);

  if (!loadState) {
    loadState = true;
    api(
      'GET',
      `https://dev.yeohaengparty.com/api/user/${userId}/friend`,
      {},
      (json: any) => {
        console.log(json);
        setFriendsData(json);
        setFriendSelectList(json);
      }
    );
  }

  const setFriendSelectListCheck = (index: number) => {
    const obj: any = friendSelectList.slice();
    obj[index].checked = !obj[index].checked;
    setFriendSelectList(obj);
  };

  let index = 0;

  return (
    <>
      <Navbar
        more
        segment={{ 친구: '/talk', '채팅 (99+)': '/talk/list' }}
      ></Navbar>
      <ContentBox>
        <ListView>
          <div className="section">
            <ListItem
              link="/talk/"
              img={0}
              title={'명명이'}
              subtitle={'누텔라 맛있다'}
            />
          </div>
          <hr />
          <div className="section">
            <h1>친구목록</h1>
            {/* <h2>ㄱ</h2> */}
            <>
              {friendsData.map((msgs: any, index) => {
                return msgs ? (
                  <ListItem
                    link={`talk/profile/${index}`}
                    title={msgs.username}
                    subtitle={msgs.stateMessage}
                    img={1}
                    key={1}
                  />
                ) : (
                  <></>
                );
              })}
            </>
          </div>
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
          setModalDisplay(true);
        }}
      />
      <ModalView
        display={modalDisplay}
        setDisplay={setModalDisplay}
        title="채팅방 개설"
        button="개설하기"
        onClickProp={() => {
          fetch('https://dev.yeohaengparty.com/api/chatroom', {
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
              fetch('https://dev.yeohaengparty.com/api/members', {
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
          <ListView>
            <div className="section">
              {friendSelectList?.map((item: any) => {
                return (
                  <ListItemAddToRoom
                    link="room"
                    key={index}
                    index={index++}
                    title={item.username}
                    subtitle={item.stateMessage}
                    checked={item.checked}
                    img={1}
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
