/* eslint-disable @next/next/no-img-element */
'use client';

import './style.css';
import Navbar from '@/component/navigationBar';
import ContentBox from '@/component/contentBox';
import Image from 'next/image';
import emptyProfile from 'public/empty_profile.png';
import profile_btn_1 from 'public/profile_btn_1.svg';
import profile_btn_2 from 'public/profile_btn_2.svg';
import profile_btn_3 from 'public/profile_btn_3.svg';
import api from '@/utils/api';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Main({ slug }: { slug: string }): any {
  const [isImage, setIsImage] = useState(true);
  const BASE_URL: string = process.env.NEXT_BASE_URL
    ? process.env.NEXT_BASE_URL
    : '';

  const [userInfo, setUserInfo] = useState<JSON | null>(null);
  api(`user/${slug}`, 'get', {}, [userInfo, setUserInfo]);

  const Router = useRouter();

  return (
    <>
      <Navbar back=" "> </Navbar>
      {isImage ? (
        <img
          src={slug ? BASE_URL + 'user/image/' + slug : ''}
          onError={(e) => {
            setIsImage(false);
          }}
          width={112}
          height={112}
          alt="image"
          style={{
            marginLeft: '-56px',
            marginTop: '-86px',
            left: '50%',
            top: '50%',
            position: 'absolute',
            zIndex: '99',
            borderRadius: '100%',
          }}
        />
      ) : (
        <Image
          src={emptyProfile}
          width={112}
          height={112}
          alt="image"
          style={{
            marginLeft: '-56px',
            marginTop: '-86px',
            left: '50%',
            top: '50%',
            position: 'absolute',
            zIndex: '99',
          }}
        />
      )}
      <div
        style={{
          width: '100%',
          height: '24px',
          marginTop: '48px',
          left: '0px',
          top: '50%',
          position: 'absolute',
          fontSize: '20px',
          zIndex: '99',
          textAlign: 'center',
          fontWeight: 'bold',
        }}
      >
        {userInfo && 'username' in userInfo
          ? (userInfo as { username: string }).username
          : ''}
      </div>
      <div
        style={{
          width: '100%',
          height: '24px',
          marginTop: '82px',
          left: '0px',
          top: '50%',
          position: 'absolute',
          fontSize: '16px',
          zIndex: '99',
          textAlign: 'center',
          color: '#777',
        }}
      >
        {userInfo && 'stateMessage' in userInfo
          ? (userInfo as { stateMessage: string }).stateMessage
          : ''}
      </div>
      <div
        style={{
          marginLeft: '-42px',
          left: '22%',
          bottom: '40px',
          position: 'absolute',
          zIndex: '99',
          textAlign: 'center',
          fontSize: '14px',
          lineHeight: '30px',
          cursor: 'pointer',
          paddingLeft: '20px',
          paddingRight: '20px',
        }}
        onClick={() => {
          api(
            'block',
            'post',
            {
              blocklistUserId: slug,
            },
            [
              null,
              () => {
                Router.push('./');
              },
            ]
          );
        }}
      >
        <Image src={profile_btn_2} alt="image" />
        <br />
        차단
      </div>
      <div
        style={{
          marginLeft: '-42px',
          left: '50%',
          bottom: '40px',
          position: 'absolute',
          zIndex: '99',
          textAlign: 'center',
          fontSize: '14px',
          lineHeight: '30px',
          cursor: 'pointer',
          paddingLeft: '20px',
          paddingRight: '20px',
        }}
      >
        <Image src={profile_btn_1} alt="image" />
        <br />
        추억보기
      </div>
      <div
        style={{
          marginLeft: '-42px',
          left: '78%',
          bottom: '40px',
          position: 'absolute',
          zIndex: '99',
          textAlign: 'center',
          fontSize: '14px',
          lineHeight: '30px',
          cursor: 'pointer',
          paddingLeft: '20px',
          paddingRight: '20px',
        }}
      >
        <Image src={profile_btn_3} alt="image" />
        <br />
        채팅하기
      </div>
      <ContentBox></ContentBox>
    </>
  );
}
