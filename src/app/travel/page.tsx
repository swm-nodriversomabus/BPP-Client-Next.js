'use client';

import './style.css';
import Navbar from '../../component/navigationBar';
import ContentBox from '../../component/contentBox';
import Tabbar from '../../component/tabBar';
import FriendsList, { FriendsListItem } from '@/view/friendsList';
import { useState } from 'react';
import api, { mapping } from '@/utils/api';

export default function Home(): any {
  const [friends, setFriends] = useState<JSON | null>(null);
  api(
    '',
    'test',
    [
      {
        username: '2023 도쿄축제 모아보기',
        stateMessage: '일본 도교',
        img: 'https://search.pstatic.net/common?src=https%3A%2F%2Fdbscthumb-phinf.pstatic.net%2F5885_000_7%2F20200924220713919_VISWF3OWS.jpg%2Ffb176_99_i1.jpg%3Ftype%3Dw540_fst&type=f180_180_travelsearch',
        link: 'https://www.gotokyo.org/kr/story/guide/the-best-festivals-in-tokyo-and-japan/index.html',
      },
      {
        username: '슈테델 미술관 - 르네상스부터 근대미술까지',
        stateMessage: '독일 프랑크푸르트',
        img: 'https://search.pstatic.net/common?src=http%3A%2F%2Fmedia-cdn.tripadvisor.com%2Fmedia%2Fphoto-o%2F07%2F54%2Fe3%2F7b%2Fstadel-museum.jpg&type=f180_180_travelsearch',
        link: 'https://blog.naver.com/deuxmy/222202462172',
      },
      {
        username: '풍차와 하얀집 그리고 파티',
        stateMessage: '그리스 미코노스 섬',
        img: 'https://search.pstatic.net/common?src=https%3A%2F%2Fdbscthumb-phinf.pstatic.net%2F5885_000_12%2F20201229163235463_ITWCPHPRH.jpg%2Ffb345_33_i1.jpg%3Ftype%3Dw540_fst&type=f180_180_travelsearch',
        link: 'https://brunch.co.kr/@skyscanner/402',
      },
    ],
    [friends, setFriends]
  );

  return (
    <>
      <Navbar
        more
        segment={{ '추천 여행지': '/travel', '버킷 목록': '/travel/bucket' }}
      >
        Travel
      </Navbar>
      <ContentBox>
        <FriendsList>
          <div className="section">
            {friends && 'length' in friends && friends.length ? (
              mapping(friends, (item: any, index: number) => {
                return (
                  <FriendsListItem
                    link={item.link}
                    title={item.username}
                    subtitle={item.stateMessage}
                    img={item.img}
                    key={1}
                  />
                );
              })
            ) : (
              <div
                style={{
                  textAlign: 'center',
                  color: '#bbb',
                  fontSize: '17px',
                  fontWeight: 'bold',
                  margin: '0',
                  paddingTop: 'calc(50vh - 210px)',
                  height: '100px',
                  cursor: 'default',
                }}
              >
                새로운 친구를 추가해보세요
              </div>
            )}
          </div>
        </FriendsList>
      </ContentBox>
      <Tabbar>4</Tabbar>
    </>
  );
}
