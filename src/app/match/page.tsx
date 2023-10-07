'use client';
import './style.css';
import Navbar from '@/component/navigationBar';
import ContentBox from '@/component/contentBox';
import Tabbar from '@/component/tabBar';
import MatchScrollView from '@/view/matchScrollView';
import Link from 'next/link';
import MatchSegment from '@/component/matchSegment';
import SearchBar from '@/component/searchBar';
import MyMatch, { MyMatchItem } from '@/component/myMatch';
import MatchRecommend, { MatchRecommendItem } from '@/component/matchRecommend';
import Image from 'next/image';
import newmatch from 'public/newmatch.svg';
import useSWR, { SWRResponse } from 'swr';
import api from '@/utils/api';
import { useState } from 'react';

// [
//   {
//     matchingId: 1,
//     writerId: 1,
//     type: 'TravelMate',
//     title: '제목',
//     place: '지역',
//     content: '내용',
//     startDate: '2023-09-04T12:00:00',
//     endDate: '2023-09-04T12:00:00',
//     maxMember: 3,
//     minusAge: 5,
//     plusAge: 5,
//     readCount: 16,
//     createdAt: '2023-08-24T07:04:52.98987',
//     updatedAt: '2023-08-24T07:04:52.98987',
//     isActive: true,
//   },
// ],

export default function Home(): any {
  const [approved, setApproved] = useState<JSON | null>(null);
  api('user/{id}/approved', 'get', {}, [approved, setApproved]);

  const [pending, setPending] = useState<JSON | null>(null);
  api('user/{id}/approved', 'get', {}, [pending, setPending]);

  const [recommend, setRecommend] = useState<JSON | null>(null);
  api('user/{id}/recommendedmatching', 'get', {}, [recommend, setRecommend]);

  return (
    <>
      <Navbar more></Navbar>
      <ContentBox
        styled={{
          height: '100%',
          cursor: 'default',
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <MatchScrollView>
          <MatchSegment />
          <SearchBar />

          {/* 승인된 매칭 */}
          {approved &&
          'length' in approved &&
          'map' in approved &&
          approved.length ? (
            <MyMatch>
              <>
                {(approved as { map: Function }).map((item: any) => {
                  return (
                    <MyMatchItem
                      link={`/match/room/${item.matchingId}`}
                      type="🎒 여행"
                      title={item.title}
                      place={item.place}
                      period={`${item.startDate.substr(
                        2,
                        2
                      )}.${item.startDate.substr(5, 2)}.${item.startDate.substr(
                        8,
                        2
                      )}~${item.endDate.substr(2, 2)}.${item.endDate.substr(
                        5,
                        2
                      )}.${item.endDate.substr(8, 2)}`}
                      currentUser={1}
                      maxUser={item.maxMember}
                      key={1}
                    />
                  );
                })}
              </>
            </MyMatch>
          ) : (
            <></>
          )}

          {/* 대기중인 매칭 */}
          {pending &&
          'length' in pending &&
          'map' in pending &&
          pending.length ? (
            <MyMatch>
              <>
                {(pending as { map: Function }).map((item: any) => {
                  return (
                    <MyMatchItem
                      link={`/match/room/${item.matchingId}`}
                      type="🎒 여행"
                      title={item.title}
                      place={item.place}
                      period={`${item.startDate.substr(
                        2,
                        2
                      )}.${item.startDate.substr(5, 2)}.${item.startDate.substr(
                        8,
                        2
                      )}~${item.endDate.substr(2, 2)}.${item.endDate.substr(
                        5,
                        2
                      )}.${item.endDate.substr(8, 2)}`}
                      currentUser={1}
                      maxUser={item.maxMember}
                      key={1}
                    />
                  );
                })}
              </>
            </MyMatch>
          ) : (
            <></>
          )}

          {/* 추천 매칭 */}
          {recommend &&
          'length' in recommend &&
          'map' in recommend &&
          recommend.length ? (
            <MatchRecommend>
              <>
                {(recommend as { map: Function }).map((item: any) => {
                  return (
                    <MatchRecommendItem
                      link={`/match/room/${item.matchingId}`}
                      type="🎒 여행"
                      title={item.title}
                      article={item.content}
                      place={item.place}
                      period={`${item.startDate.substr(
                        2,
                        2
                      )}.${item.startDate.substr(5, 2)}.${item.startDate.substr(
                        8,
                        2
                      )}~${item.endDate.substr(2, 2)}.${item.endDate.substr(
                        5,
                        2
                      )}.${item.endDate.substr(8, 2)}`}
                      currentUser={1}
                      maxUser={item.maxMember}
                      key={1}
                    />
                  );
                })}
              </>
            </MatchRecommend>
          ) : (
            <></>
          )}
        </MatchScrollView>
      </ContentBox>
      <Link href="match/new">
        <Image
          src={newmatch}
          alt="new match"
          style={{
            cursor: 'pointer',
            position: 'absolute',
            bottom: '76px',
            right: '16px',
          }}
        />
      </Link>
      <Tabbar>3</Tabbar>
    </>
  );
}
