'use client';

import './style.css';
import Navbar from '@/component/navigationBar';
import ContentBox from '@/component/contentBox';
import api from '@/utils/api';

export default function Home(): any {
  return (
    <>
      <Navbar back=" ">차단리스트</Navbar>
      <ContentBox>api 추가 필요!</ContentBox>
    </>
  );
}
