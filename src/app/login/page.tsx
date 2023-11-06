'use client';

import './style.css';
import rect_logo from 'public/rect_logo.svg';
import login_bg from 'public/login_bg.svg';
import Image from 'next/image';
import kakao_btn from 'public/kakao_btn.svg';
import google_btn from 'public/google_btn.svg';
import naver_btn from 'public/naver_btn.svg';
import instagram_btn from 'public/instagram_btn.svg';
import apple_btn from 'public/apple_btn.svg';
import api from '@/utils/api';
import { useState } from 'react';

export default function Home(): any {
  const BASE_URL = process.env.NEXT_BASE_URL;
  const [logout, setLogout] = useState(null);

  const kakaoLogin = () => {
    localStorage.setItem('lastchannel', 'kakao');
    window.location.href = `${BASE_URL}oauth2/authorization/kakao`;
  };
  const googleLogin = () => {
    localStorage.setItem('lastchannel', 'google');
    window.location.href = `${BASE_URL}oauth2/authorization/google`;
  };
  const naverLogin = () => {
    localStorage.setItem('lastchannel', 'naver');
    window.location.href = `${BASE_URL}oauth2/authorization/naver`;
  };

  if (localStorage.getItem('welcome') == 'true') {
    localStorage.removeItem('welcome');
    switch (localStorage.getItem('lastchannel')) {
      case 'kakao':
        kakaoLogin();
        break;
      case 'google':
        googleLogin();
        break;
      case 'naver':
        naverLogin();
        break;
      case null:
        break;
    }
    return <></>;
  }

  api('logout', 'post', {}, [logout, setLogout]);

  if (logout === null) {
    return <></>;
  }
  return (
    <>
      <div
        style={{
          background: '#100B2F',
          height: '100%',
          position: 'absolute',
          width: '100%',
        }}
      ></div>
      <div
        style={{
          background: '#F0ECDE',
          top: '0px',
          height: 'calc(50% + 142px)',
          position: 'absolute',
          width: '100%',
        }}
      ></div>
      <Image
        src={login_bg}
        alt="bg"
        style={{
          position: 'absolute',
          left: '0px',
          top: '50%',
          marginTop: '-440px',
          zIndex: '0',
          width: '100%',
        }}
      />
      <Image
        src={rect_logo}
        alt="logo"
        style={{
          position: 'relative',
          left: '50%',
          top: '25%',
          marginLeft: '-50px',
          marginTop: '-100px',
        }}
      />
      <Image
        src={kakao_btn}
        alt="btn"
        style={{
          position: 'absolute',
          top: '70%',
          marginTop: '40px',
          left: '50%',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          fontSize: '15px',
          fontWeight: 'bold',
          cursor: 'pointer',
          marginLeft: '-160px',
        }}
        onClick={kakaoLogin}
      />
      <Image
        src={google_btn}
        alt="btn"
        style={{
          position: 'absolute',
          top: '70%',
          marginTop: '120px',
          left: '50%',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          fontSize: '15px',
          fontWeight: 'bold',
          cursor: 'pointer',
          marginLeft: '-50px',
        }}
        onClick={googleLogin}
      />
      <Image
        src={naver_btn}
        alt="btn"
        style={{
          position: 'absolute',
          top: '70%',
          marginTop: '120px',
          left: '50%',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          fontSize: '15px',
          fontWeight: 'bold',
          cursor: 'pointer',
          marginLeft: '10px',
        }}
        onClick={naverLogin}
      />
      <Image
        src={apple_btn}
        alt="btn"
        style={{
          position: 'absolute',
          top: '70%',
          marginTop: '120px',
          left: '50%',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          fontSize: '15px',
          fontWeight: 'bold',
          cursor: 'pointer',
          marginLeft: '-110px',
        }}
      />
      <Image
        src={instagram_btn}
        alt="btn"
        style={{
          position: 'absolute',
          top: '70%',
          marginTop: '120px',
          left: '50%',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          fontSize: '15px',
          fontWeight: 'bold',
          cursor: 'pointer',
          marginLeft: '70px',
        }}
      />
    </>
  );
}
