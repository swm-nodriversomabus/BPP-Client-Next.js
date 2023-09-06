'use client';

export default function Home(): any {
  const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_URL;
  const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
  console.log(KAKAO_REST_API_KEY);
  const kakaoLogin = () => {
    window.open(
      `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`
    );
  };
  return (
    <>
      <button
        style={{
          position: 'relative',
          top: '50%',
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
          marginTop: '-20px',
        }}
        onClick={kakaoLogin}
      >
        카카오 로그인
      </button>
    </>
  );
}
