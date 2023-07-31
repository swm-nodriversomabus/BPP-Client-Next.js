'use client';

import './style.css';
import Navbar from '@/component/navigationBar';
import ContentBox from '@/component/contentBox';
import Tabbar from '@/component/tabBar';
import ListView from '@/view/listView';
import Link from 'next/link';
import useSWRInfinite, { SWRInfiniteResponse } from 'swr/infinite';
import { RefObject, useEffect, useRef, useState } from 'react';

const getKey = (pageIndex: any, previousPageData: any) => {
  if (previousPageData && !previousPageData.length) return null;
  return `http://godjh.dothome.co.kr/api/talk/list/?page=${pageIndex}`;
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
        segment={{ 친구: '/talk', 채팅방: '/talk/list' }}
        segmentIndex="1"
      >
        Talk
      </Navbar>
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
                  return (
                    <Link href="room" key={i++}>
                      {msg.message}
                    </Link>
                  );
                });
              })}
            </>
          </div>
          <div className="listMargin"></div>
        </ListView>
      </ContentBox>
      <Tabbar>2</Tabbar>
    </>
  );
}
