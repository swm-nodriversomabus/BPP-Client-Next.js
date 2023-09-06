'use client';

export default function Home(): any {
  const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_URL;
  const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
  const GOOGLE_REST_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_REST_API_URL;
  const GOOGLE_REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;
  const kakaoLogin = () => {
    window.open(
      `https://kauth.kakao.com/oauth/authorize` +
        `?client_id=${KAKAO_REST_API_KEY}` +
        `&redirect_uri=${KAKAO_REDIRECT_URI}` +
        `&response_type=code`
    );
  };
  const googleLogin = () => {
    window.open(
      `https://accounts.google.com/o/oauth2/v2/auth` +
        `?client_id=${GOOGLE_REST_API_KEY}` +
        `&redirect_uri=${GOOGLE_REDIRECT_URI}` +
        `&response_type=code` +
        `&scope=email`
    );
  };

  return (
    <>
      <button
        style={{
          position: 'relative',
          left: '50%',
          width: '200px',
          height: '40px',
          background: '#09f',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          fontSize: '15px',
          fontWeight: 'bold',
          cursor: 'pointer',
          marginLeft: '-100px',
          marginTop: '20px',
        }}
        onClick={kakaoLogin}
      >
        카카오 로그인
      </button>
      <button
        style={{
          position: 'relative',
          left: '50%',
          width: '200px',
          height: '40px',
          background: '#09f',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          fontSize: '15px',
          fontWeight: 'bold',
          cursor: 'pointer',
          marginLeft: '-100px',
          marginTop: '20px',
        }}
        onClick={googleLogin}
      >
        구글 로그인
      </button>
    </>
  );
}
