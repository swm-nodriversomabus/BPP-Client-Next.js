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
import { useRouter } from 'next/navigation';

export default function Home(): any {
  const router = useRouter();
  // const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  const kakaoLogin = () => {
    router.push('https://dev.yeohaengparty.com/api/oauth2/authorization/kakao');
  };
  const googleLogin = () => {
    router.push(
      'https://dev.yeohaengparty.com/api/oauth2/authorization/google'
    );
  };
  const naverLogin = () => {
    router.push('https://dev.yeohaengparty.com/api/oauth2/authorization/naver');
  };

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
      <Image
        src={login_bg}
        alt="bg"
        style={{
          position: 'absolute',
          left: '0px',
          top: '-50px',
          zIndex: '0',
          width: '100%',
          background: '#F0ECDE',
        }}
      />
      <Image
        src={rect_logo}
        alt="logo"
        style={{
          position: 'relative',
          left: '50%',
          marginLeft: '-50px',
          marginTop: '80px',
        }}
      />
      <Image
        src={kakao_btn}
        alt="btn"
        style={{
          position: 'relative',
          left: '50%',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          fontSize: '15px',
          fontWeight: 'bold',
          cursor: 'pointer',
          marginLeft: '-160px',
          marginTop: '400px',
        }}
        onClick={kakaoLogin}
      />
      <Image
        src={google_btn}
        alt="btn"
        style={{
          position: 'relative',
          left: '50%',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          fontSize: '15px',
          fontWeight: 'bold',
          cursor: 'pointer',
          marginLeft: '-50px',
          marginTop: '20px',
        }}
        onClick={googleLogin}
      />
      <Image
        src={naver_btn}
        alt="btn"
        style={{
          position: 'relative',
          left: '50%',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          fontSize: '15px',
          fontWeight: 'bold',
          cursor: 'pointer',
          marginLeft: '10px',
          marginTop: '-40px',
        }}
        onClick={naverLogin}
      />
      <Image
        src={apple_btn}
        alt="btn"
        style={{
          position: 'relative',
          left: '50%',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          fontSize: '15px',
          fontWeight: 'bold',
          cursor: 'pointer',
          marginLeft: '-110px',
          marginTop: '-40px',
        }}
      />
      <Image
        src={instagram_btn}
        alt="btn"
        style={{
          position: 'relative',
          left: '50%',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          fontSize: '15px',
          fontWeight: 'bold',
          cursor: 'pointer',
          marginLeft: '70px',
          marginTop: '-40px',
        }}
      />
    </>
  );
}
