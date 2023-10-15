'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import menu from 'public/menu.svg';

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
  return (
    <div className="MoreMenuList" style={{ paddingTop: '67px' }}>
      {menuList}
    </div>
  );
};

const MoreButton: any = () => {
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  return (
    <>
      <div
        onClick={() => {
          setMoreMenuOpen(moreMenuOpen ? false : true);
        }}
        className="MoreButton"
      >
        <Image src={menu} alt="더 보기" width={24} height={24}></Image>
      </div>
      <div
        onClick={(e) => {
          if ('className' in e.target && e.target.className == 'MoreMenu') {
            setMoreMenuOpen(false);
          }
        }}
        style={{ display: moreMenuOpen ? 'block' : 'none', height: '0' }}
      >
        <div className="MoreMenu">
          <MoreMenuList
            list={{
              알림: '/notification',
              공지사항: '/notice',
              마이페이지: '/mypage',
              설정: '/setting',
              '고객센터 문의': '/talk/room',
              로그아웃: '/login',
            }}
          />
        </div>
      </div>
    </>
  );
};

export default MoreButton;
