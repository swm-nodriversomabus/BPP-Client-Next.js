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

export default function Home(): any {
  const myData: Array<object> = [
    // {
    //   matchingId: 1,
    //   writerId: 1,
    //   type: 'TravelMate',
    //   title: '제목',
    //   place: '지역',
    //   content: '내용',
    //   startDate: '2023-09-04T12:00:00',
    //   endDate: '2023-09-04T12:00:00',
    //   maxMember: 3,
    //   minusAge: 5,
    //   plusAge: 5,
    //   readCount: 16,
    //   createdAt: '2023-08-24T07:04:52.98987',
    //   updatedAt: '2023-08-24T07:04:52.98987',
    //   isActive: true,
    // },
  ];
  const { data, error, isLoading }: SWRResponse = useSWR(
    // 'https://dev.yeohaengparty.com/api/matching',
    `https://dev.yeohaengparty.com/api/user/${1}/recommendedmatching`,
    (url: RequestInfo | URL) => fetch(url).then((r) => r.json())
  );
  let idata: Array<object>;
  if (data && data.length) idata = data.slice().reverse();
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
          {myData.length ? (
            <MyMatch>
              <>
                {myData?.map((msg: any) => {
                  return (
                    <MyMatchItem
                      link={`/match/room/${msg.matchingId}`}
                      type="🎒 여행"
                      title={msg.title}
                      place={msg.place}
                      period={`${msg.startDate.substr(
                        2,
                        2
                      )}.${msg.startDate.substr(5, 2)}.${msg.startDate.substr(
                        8,
                        2
                      )}~${msg.endDate.substr(2, 2)}.${msg.endDate.substr(
                        5,
                        2
                      )}.${msg.endDate.substr(8, 2)}`}
                      currentUser={1}
                      maxUser={msg.maxMember}
                      key={1}
                    />
                  );
                })}
              </>
            </MyMatch>
          ) : (
            <></>
          )}
          <MatchRecommend>
            <>
              {idata?.map((msg: any) => {
                return (
                  <MatchRecommendItem
                    link={`/match/room/${msg.matchingId}`}
                    type="🎒 여행"
                    title={msg.title}
                    article={msg.content}
                    place={msg.place}
                    period={`${msg.startDate.substr(
                      2,
                      2
                    )}.${msg.startDate.substr(5, 2)}.${msg.startDate.substr(
                      8,
                      2
                    )}~${msg.endDate.substr(2, 2)}.${msg.endDate.substr(
                      5,
                      2
                    )}.${msg.endDate.substr(8, 2)}`}
                    currentUser={1}
                    maxUser={msg.maxMember}
                    key={1}
                  />
                );
              })}
            </>
          </MatchRecommend>
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
