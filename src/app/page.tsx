'use client';
import Link from 'next/link';
import Navbar from '@/component/navigationBar';
import Tabbar from '@/component/tabBar';
import ContentBox from '@/component/contentBox';
import Image from 'next/image';
import mainbanner1 from 'public/mainbanner_1.svg';
import packagebanner1 from 'public/packagebanner_1.svg';
import matebanner1 from 'public/matebanner_1.svg';
import accombanner1 from 'public/accombanner_1.svg';
import api, { isMap, mapping } from '@/utils/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import MyMatch, { MyMatchItem } from '@/component/myMatch';

const FlickView = (Props: { children: Array<JSX.Element> | undefined }) => {
  return <div className="FlickView">{Props.children}</div>;
};

export default function Home(): any {
  const router = useRouter();

  const [recommendMatch, setRecommendMatch] = useState<JSON | null>(null);
  api('user/recommendedmatching', 'get', {}, [
    recommendMatch,
    setRecommendMatch,
  ]);

  return (
    <>
      <Navbar more></Navbar>
      <ContentBox>
        <FlickView>
          <Image src={mainbanner1} alt="banner" />
          <Image src={mainbanner1} alt="banner" />
          <Image src={mainbanner1} alt="banner" />
          <Image src={mainbanner1} alt="banner" />
        </FlickView>
        <div className="SectionTitle">추천 패키지</div>
        <FlickView>
          <Image src={packagebanner1} alt="banner" />
          <Image src={packagebanner1} alt="banner" />
          <Image src={packagebanner1} alt="banner" />
          <Image src={packagebanner1} alt="banner" />
        </FlickView>
        {/* 승인된 매칭 */}
        {isMap(recommendMatch) ? (
          <>
            <div className="SectionTitle">{'추천 매칭'}</div>
            <FlickView>
              {mapping(recommendMatch, (item: any) => {
                return (
                  <MyMatchItem
                    link={`/match/room/${item.matchingId}`}
                    // type="🎒 여행"
                    type={item.type}
                    title={item.title}
                    place={item.place}
                    period={`${item.startDate[0]}.${item.startDate[1]}.${item.startDate[2]}~${item.endDate[0]}.${item.endDate[1]}.${item.endDate[2]}`}
                    currentUser={1}
                    maxUser={item.maxMember}
                    key={1}
                  />
                );
              })}
            </FlickView>
          </>
        ) : (
          <></>
        )}

        <div className="SectionTitle">추천 메이트</div>
        <FlickView>
          <Image src={matebanner1} alt="banner" />
          <Image src={matebanner1} alt="banner" />
          <Image src={matebanner1} alt="banner" />
          <Image src={matebanner1} alt="banner" />
          <Image src={matebanner1} alt="banner" />
        </FlickView>
        <div className="SectionTitle">추천 숙소</div>
        <FlickView>
          <Image src={accombanner1} alt="banner" />
          <Image src={accombanner1} alt="banner" />
          <Image src={accombanner1} alt="banner" />
          <Image src={accombanner1} alt="banner" />
          <Image src={accombanner1} alt="banner" />
        </FlickView>
      </ContentBox>
      <Tabbar></Tabbar>
    </>
  );
}
