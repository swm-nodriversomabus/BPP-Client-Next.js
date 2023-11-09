'use client';

import './style.css';
import Navbar from '@/component/navigationBar';
import ContentBox from '@/component/contentBox';
import api from '@/utils/api';

export default function Home(): any {
  return (
    <>
      <Navbar back=" ">내 여행 선호도</Navbar>
      <ContentBox></ContentBox>
    </>
  );
}
