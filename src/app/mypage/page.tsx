'use client';

import './style.css';
import Navbar from '@/component/navigationBar';
import ContentBox from '@/component/contentBox';
import emptyProfile from 'public/empty_profile.png';
import Image from 'next/image';
import { useState } from 'react';
import api from '@/utils/api';
import Link from 'next/link';

export default function Home(): any {
  const [myInfo, setMyInfo] = useState<JSON | null>(null);
  api('user', 'get', {}, [myInfo, setMyInfo]);

  return (
    <>
      <Navbar back=" ">마이페이지</Navbar>
      <ContentBox>
        <div className="MyProfile">
          <Image src={emptyProfile} width={72} alt="image" />
          <div>
            {myInfo && 'username' in myInfo
              ? (myInfo as { username: string }).username
              : ''}
          </div>
          <div>
            {myInfo && 'stateMessage' in myInfo
              ? (myInfo as { stateMessage: string }).stateMessage
              : ''}
          </div>
        </div>
        {/* <div className="MyPageListItem">내 여행 기록</div> */}
        <Link href={'./mypage/preference'}>
          <div className="MyPageListItem">여행 선호도 관리</div>
        </Link>
        <Link href={'./mypage/block'}>
          <div className="MyPageListItem">차단 리스트</div>
        </Link>
        <Link href={'./mypage/manner'}>
          <div className="MyPageListItem">
            내 매너레벨
            <div className="MyPageListItemLevel">{`Lv.${
              myInfo && 'mannerScore' in myInfo
                ? (myInfo as { mannerScore: string }).mannerScore
                : 0
            }`}</div>
          </div>{' '}
        </Link>
        <div className="MyPageListSeperator"></div>
        {/* <div className="MyPageListItem">계정 연동</div> */}
        <Link href={'./mypage/terms'}>
          <div className="MyPageListItem">약관 및 정책</div>
        </Link>
        {/* <div className="MyPageListItem">앱정보</div> */}
      </ContentBox>
    </>
  );
}
