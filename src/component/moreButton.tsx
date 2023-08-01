'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const MoreMenuList: any = (Props: { list: Object | undefined }) => {
  let menuList: React.ReactElement = <></>;
  const list: Object | undefined = Props.list;
  if (list) {
    Object.keys(list).forEach(
      (value: string, index: number, array: string[]) => {
        menuList = (
          <>
            {menuList}
            <Link href={Object.values(list)[index]}>{value}</Link>
          </>
        );
      }
    );
  }
  return <div className="MoreMenuList">{menuList}</div>;
};

const MoreButton: any = () => {
  return (
    <>
      <div
        onClick={(event) => {
          const mml = document.querySelector('.MoreMenuList');
          if (mml) {
            mml.style.display = mml.style.display == '' ? 'block' : '';
          }
        }}
        className="MoreButton"
      >
        <Image src="/more.svg" alt="더 보기" width={24} height={24}></Image>
      </div>
      <MoreMenuList
        list={{
          알림: '/notification',
          공지사항: '/notice',
          마이페이지: '/mypage',
          설정: '/setting',
          '고객센터 문의': '/talk/room',
          로그아웃: '/join',
        }}
      />
    </>
  );
};

export default MoreButton;
