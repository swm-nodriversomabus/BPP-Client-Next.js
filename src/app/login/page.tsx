'use client';

export default function Home(): any {
  const KAKAO_REST_API_KEY = '8e9f7289f1ffaaa651b31306546ca035'; //REST API KEY
  // oauth 요청 URL
  // const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`

  // const handleLogin = ()=>{
  //     window.location.href = kakaoURL
  // }
  
  
  const handleKakaoLogin = async () => {
    
    // try {
    //   // 카카오 로그인 팝업 열기
    //   const authResponse = await window.Kakao.Auth.login({
    //     success: function (authObj) {
    //       // 카카오 로그인 성공 시 받아온 토큰을 서버로 전송
    //       axios.post('/api/kakao-login', { accessToken: authObj.access_token })
    //         .then(response => {
    //           console.log('서버 응답:', response.data);
    //           // 로그인 성공 처리 로직 추가
    //         })
    //         .catch(error => {
    //           console.error('서버 오류:', error);
    //           // 에러 처리 로직 추가
    //         });
    //     },
    //     fail: function (error) {
    //       console.error('카카오 로그인 실패:', error);
    //       // 에러 처리 로직 추가
    //     },
    //   });
    // } catch (error) {
    //   console.error('카카오 SDK 로드 오류:', error);
    //   // 에러 처리 로직 추가
    // }
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
        onClick={handleKakaoLogin}
      >
        카카오 로그인
      </button>
      
    </>
  );
}
