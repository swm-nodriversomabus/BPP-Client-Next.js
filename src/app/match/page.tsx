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
import api, { isMap, mapping } from '@/utils/api';
import { useState } from 'react';
import search from 'public/search.svg';

// [
//   {
//     "matchingId": 1,
//     "writerId": 12,
//     "type": "TravelMate",
//     "title": "함께 여행해요",
//     "place": "파리",
//     "content": "",
//     "startDate": [2023, 9, 4, 12, 0],
//     "endDate": [2023, 9, 4, 12, 0],
//     "maxMember": 3,
//     "minusAge": 5,
//     "plusAge": 5,
//     "readCount": 16,
//     "createdAt": [2023, 10, 10, 2, 45, 31, 403999000],
//     "updatedAt": [2023, 10, 10, 2, 45, 31, 403999000],
//     "isActive": true
//   },
// ],

export default function Home(): any {
  const [matchSeg, setMatchSeg] = useState(0);

  const [matchOwn, setMatchOwn] = useState<JSON | null>(null);
  api('user/matching/own', 'get', {}, [matchOwn, setMatchOwn]);
  // api(
  //   'user/matching/own',
  //   'test',
  //   [
  //     {
  //       matchingId: 1,
  //       writerId: 12,
  //       type: 'TravelMate',
  //       title: '같이 맨시티 응원하러 가실 분 구해요',
  //       place: '맨시티',
  //       content: '',
  //       startDate: [2023, 11, 28, 12, 0],
  //       endDate: [2023, 11, 28, 12, 0],
  //       currentMember: 2,
  //       maxMember: 5,
  //       minusAge: 5,
  //       plusAge: 5,
  //       readCount: 16,
  //       createdAt: [2023, 10, 10, 2, 45, 31, 403999000],
  //       updatedAt: [2023, 10, 10, 2, 45, 31, 403999000],
  //       isActive: true,
  //     },
  //     {
  //       matchingId: 1,
  //       writerId: 12,
  //       type: 'Accomodation',
  //       title: '저렴하게 같이 숙소쉐어해요!',
  //       place: '숙소',
  //       content: '',
  //       startDate: [2023, 11, 27, 12, 0],
  //       endDate: [2023, 11, 29, 12, 0],
  //       currentMember: 2,
  //       maxMember: 5,
  //       minusAge: 5,
  //       plusAge: 5,
  //       readCount: 16,
  //       createdAt: [2023, 10, 10, 2, 45, 31, 403999000],
  //       updatedAt: [2023, 10, 10, 2, 45, 31, 403999000],
  //       isActive: true,
  //     },
  //   ],
  //   [matchOwn, setMatchOwn]
  // );

  const [approved, setApproved] = useState<JSON | null>(null);
  api('user/approved', 'get', {}, [approved, setApproved]);

  const [pending, setPending] = useState<JSON | null>(null);
  api('user/pending', 'get', {}, [pending, setPending]);

  const [recommend, setRecommend] = useState<JSON | null>(null);
  api('user/recommendedmatching', 'get', {}, [recommend, setRecommend]);
  // api(
  //   'user/recommendedmatching',
  //   'test',
  //   [
  //     {
  //       matchingId: 1,
  //       writerId: 12,
  //       type: 'Dining',
  //       title: '일본 야시장 같이 가요',
  //       place: '도톤보리',
  //       content: '',
  //       startDate: [2023, 11, 23, 12, 0],
  //       endDate: [2023, 11, 23, 12, 0],
  //       currentMember: 2,
  //       maxMember: 3,
  //       minusAge: 5,
  //       plusAge: 5,
  //       readCount: 16,
  //       createdAt: [2023, 10, 10, 2, 45, 31, 403999000],
  //       updatedAt: [2023, 10, 10, 2, 45, 31, 403999000],
  //       isActive: true,
  //     },
  //     {
  //       matchingId: 1,
  //       writerId: 12,
  //       type: 'TravelMate',
  //       title: '독일 크리스마스 마켓',
  //       place: '뉘른베르크',
  //       content: '',
  //       startDate: [2023, 12, 24, 12, 0],
  //       endDate: [2023, 12, 25, 12, 0],
  //       currentMember: 1,
  //       maxMember: 2,
  //       minusAge: 5,
  //       plusAge: 5,
  //       readCount: 16,
  //       createdAt: [2023, 10, 10, 2, 45, 31, 403999000],
  //       updatedAt: [2023, 10, 10, 2, 45, 31, 403999000],
  //       isActive: true,
  //     },
  //     {
  //       matchingId: 1,
  //       writerId: 12,
  //       type: 'TravelMate',
  //       title: '세계에서 가장 빠른 2024',
  //       place: '키리바시 공화국',
  //       content: '',
  //       startDate: [2023, 12, 31, 12, 0],
  //       endDate: [2024, 1, 1, 12, 0],
  //       currentMember: 2,
  //       maxMember: 5,
  //       minusAge: 5,
  //       plusAge: 5,
  //       readCount: 16,
  //       createdAt: [2023, 10, 10, 2, 45, 31, 403999000],
  //       updatedAt: [2023, 10, 10, 2, 45, 31, 403999000],
  //       isActive: true,
  //     },
  //   ],
  //   [recommend, setRecommend]
  // );

  const [searchText, setSearchText] = useState('');

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
          <div className="MatchSegment">
            <div
              className={matchSeg == 0 ? 'selected' : ''}
              onClick={() => {
                setMatchSeg(0);
              }}
            >
              💜 전체
            </div>
            <div
              className={matchSeg == 1 ? 'selected' : ''}
              onClick={() => {
                setMatchSeg(1);
              }}
            >
              🎒 여행
            </div>
            <div
              className={matchSeg == 2 ? 'selected' : ''}
              onClick={() => {
                setMatchSeg(2);
              }}
            >
              🏠 숙박
            </div>
            <div
              className={matchSeg == 3 ? 'selected' : ''}
              onClick={() => {
                setMatchSeg(3);
              }}
            >
              🍱 식사
            </div>
          </div>
          <div className="SearchBar">
            <Image src={search} alt="search"></Image>
            <input
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
              placeholder="검색"
            />
          </div>
          {/* 내가 만든 매칭 */}
          {isMap(matchOwn) ? (
            <MyMatch title="내가 만든 매칭">
              <>
                {mapping(matchOwn, (item: any) => {
                  return (
                    <MyMatchItem
                      link={`/match/room/${item.matchingId}`}
                      type={item.type}
                      title={item.title}
                      place={item.place}
                      period={`${item.startDate[0]}.${item.startDate[1]}.${item.startDate[2]}~${item.endDate[0]}.${item.endDate[1]}.${item.endDate[2]}`}
                      currentUser={item.currentMember}
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
          {/* 승인된 매칭 */}
          {isMap(approved) ? (
            <MyMatch title="참여 중인 매칭">
              <>
                {mapping(approved, (item: any) => {
                  return (
                    <MyMatchItem
                      link={`/match/room/${item.matchingId}`}
                      type={item.type}
                      title={item.title}
                      place={item.place}
                      period={`${item.startDate[0]}.${item.startDate[1]}.${item.startDate[2]}~${item.endDate[0]}.${item.endDate[1]}.${item.endDate[2]}`}
                      currentUser={item.currentMember}
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
          {isMap(pending) ? (
            <MyMatch title="신청한 매칭">
              <>
                {mapping(pending, (item: any) => {
                  return (
                    <MyMatchItem
                      link={`/match/room/${item.matchingId}`}
                      type={item.type}
                      title={item.title}
                      place={item.place}
                      period={`${item.startDate[0]}.${item.startDate[1]}.${item.startDate[2]}~${item.endDate[0]}.${item.endDate[1]}.${item.endDate[2]}`}
                      currentUser={item.currentMember}
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
          {isMap(recommend) ? (
            <MatchRecommend>
              <>
                {mapping(recommend, (item: any) => {
                  let flag = searchText ? false : true;
                  if (!flag && item.title.search(searchText) > -1) flag = true;
                  if (!flag && item.content.search(searchText) > -1)
                    flag = true;
                  if (!flag && item.place.search(searchText) > -1) flag = true;
                  if (flag) {
                    if (
                      matchSeg &&
                      item.type !=
                        ['', 'TravelMate', 'Accommodation', 'Dining'][matchSeg]
                    ) {
                      flag = false;
                    }
                  }
                  return (
                    <MatchRecommendItem
                      link={`/match/room/${item.matchingId}`}
                      type={item.type}
                      title={item.title}
                      article={item.content}
                      place={item.place}
                      period={`${item.startDate[0]}.${item.startDate[1]}.${item.startDate[2]}~${item.endDate[0]}.${item.endDate[1]}.${item.endDate[2]}`}
                      currentUser={item.currentMember}
                      maxUser={item.maxMember}
                      key={1}
                      hidden={!flag}
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
