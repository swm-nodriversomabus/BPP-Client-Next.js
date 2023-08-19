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

export default function Main(): any {
  const router = useRouter();
  const [modalDisplay, setModalDisplay] = useState(false);

  const [friendSelectList, setFriendSelectList] = useState([
    { title: '친구1', subtitle: '상태 메시지..', checked: false },
    { title: '친구2', subtitle: '상태 메시지..', checked: false },
    { title: '친구3', subtitle: '상태 메시지..', checked: false },
    { title: '친구4', subtitle: '상태 메시지..', checked: false },
    { title: '친구5', subtitle: '상태 메시지..', checked: false },
    { title: '친구6', subtitle: '상태 메시지..', checked: false },
    { title: '친구7', subtitle: '상태 메시지..', checked: false },
    { title: '친구8', subtitle: '상태 메시지..', checked: false },
  ]);

  const setFriendSelectListCheck = (index: number) => {
    const obj = friendSelectList.slice();
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
            <ListItem link="/talk/" title="나" subtitle="상태 메시지.." />
          </div>
          <hr />
          <div className="section">
            <h1>친구목록</h1>
            <h2>ㄱ</h2>
            <ListItem
              link="/talk/room"
              title="갓용명"
              subtitle="상태 메시지.."
            />
            <ListItem
              link="/talk/room"
              title="강용명"
              subtitle="상태 메시지.."
            />
            <ListItem
              link="/talk/room"
              title="고용명"
              subtitle="상태 메시지.."
            />
            <ListItem
              link="/talk/room"
              title="곽용명"
              subtitle="상태 메시지.."
            />
            <ListItem
              link="/talk/room"
              title="구용명"
              subtitle="상태 메시지.."
            />
            <ListItem
              link="/talk/room"
              title="권용명"
              subtitle="상태 메시지.."
            />
            <ListItem
              link="/talk/room"
              title="김용명"
              subtitle="상태 메시지.."
            />
            <h2>ㄴ</h2>
            <ListItem
              link="/talk/room"
              title="나용명"
              subtitle="상태 메시지.."
            />
            <ListItem
              link="/talk/room"
              title="노용명"
              subtitle="상태 메시지.."
            />
            <h2>ㄹ</h2>
            <ListItem
              link="/talk/room"
              title="류용명"
              subtitle="상태 메시지.."
            />
            <h2>ㅁ</h2>
            <ListItem
              link="/talk/room"
              title="문용명"
              subtitle="상태 메시지.."
            />
            <ListItem
              link="/talk/room"
              title="민용명"
              subtitle="상태 메시지.."
            />
            <h2>ㅂ</h2>
            <ListItem
              link="/talk/room"
              title="박용명"
              subtitle="상태 메시지.."
            />
            <ListItem
              link="/talk/room"
              title="배용명"
              subtitle="상태 메시지.."
            />
            <ListItem
              link="/talk/room"
              title="백용명"
              subtitle="상태 메시지.."
            />
            <h2>ㅅ</h2>
            <ListItem
              link="/talk/room"
              title="서용명"
              subtitle="상태 메시지.."
            />
            <ListItem
              link="/talk/room"
              title="성용명"
              subtitle="상태 메시지.."
            />
            <ListItem
              link="/talk/room"
              title="소용명"
              subtitle="상태 메시지.."
            />
            <ListItem
              link="/talk/room"
              title="송용명"
              subtitle="상태 메시지.."
            />
            <ListItem
              link="/talk/room"
              title="신용명"
              subtitle="상태 메시지.."
            />
            <ListItem
              link="/talk/room"
              title="심용명"
              subtitle="상태 메시지.."
            />
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
          setModlaDisplay(true);
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
