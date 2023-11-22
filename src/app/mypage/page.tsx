/* eslint-disable @next/next/no-img-element */
'use client';

import './style.css';
import Navbar from '@/component/navigationBar';
import ContentBox from '@/component/contentBox';
import emptyProfile from 'public/empty_profile.png';
import Image from 'next/image';
import { useState } from 'react';
import api from '@/utils/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home(): any {
  const router = useRouter();
  const [isImage, setIsImage] = useState(true);
  const [myInfo, setMyInfo] = useState<JSON | null>(null);
  api('user', 'get', {}, [myInfo, setMyInfo]);
  // api(
  //   'user',
  //   'test',
  //   {
  //     userId: 12,
  //     username: '기사없는소마버스',
  //     gender: '남성',
  //     age: 20,
  //     phone: '010-1234-5566',
  //     role: '0',
  //     blacklist: false,
  //     stateMessage: '여행은 재미있어요 할 때마다 새로운 기분이고',
  //     mannerScore: 3,
  //     createdAt: '2023-10-06T13:28:03.476Z',
  //     updatedAt: '2023-10-06T13:28:03.476Z',
  //     isActive: true,
  //   },
  //   [myInfo, setMyInfo]
  // );

  return (
    <>
      <Navbar
        back=" "
        btn="편집"
        btnOnClick={() => {
          router.push('./mypage/edit');
        }}
      >
        마이페이지
      </Navbar>
      <ContentBox>
        <div className="MyProfile">
          {isImage ? (
            <img
              src={`${process.env.NEXT_BASE_URL}user/image`}
              onError={(e) => {
                setIsImage(false);
              }}
              width={72}
              height={72}
              alt="image"
            />
          ) : (
            <Image src={emptyProfile} width={72} height={72} alt="image" />
          )}
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
        {/* <Link href={'./mypage/block'}>
          <div className="MyPageListItem">차단 리스트</div>
        </Link> */}
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
        <Link href={'./mypage/terms'}>
          <div className="MyPageListItem">이용약관</div>
        </Link>
        <Link href={'./mypage/privacy'}>
          <div className="MyPageListItem">개인정보 처리방침</div>
        </Link>
        {/* <div className="MyPageListItem">앱정보</div> */}
        <div className="MyPageListSeperator"></div>
        <Link href={'./mypage/delete'}>
          <div className="MyPageListItem">서비스 탈퇴</div>
        </Link>
      </ContentBox>
    </>
  );
}
