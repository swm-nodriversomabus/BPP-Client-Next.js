import './style.css';
import Navbar from '@/(component)/navigationBar';

interface propsType {
  children: string;
  background: string | undefined;
  color: string | undefined;
}

const SocialBtn: any = ({ children, background, color }: propsType) => {
  return (
    <>
      <br></br>
      <button
        style={{
          backgroundColor: background ? '#' + background : '#FFFFFF',
          color: color ? '#' + color : '#000000',
        }}
      >
        {children}
      </button>
    </>
  );
};

export default function Home(): any {
  return (
    <>
      <Navbar back="Home">소셜 로그인</Navbar>
      <center>
        <SocialBtn background="FE0" color="400">
          Kakao Login
        </SocialBtn>
        <SocialBtn background="E4D" color="FFF">
          Instagram Login
        </SocialBtn>
        <SocialBtn background="4B1" color="FFF">
          Naver Login
        </SocialBtn>
        <SocialBtn background="FFF">Google Login</SocialBtn>
        <SocialBtn background="111" color="FFF">
          Apple Login
        </SocialBtn>
      </center>
    </>
  );
}
