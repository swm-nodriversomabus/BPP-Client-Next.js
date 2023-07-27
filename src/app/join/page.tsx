import Link from 'next/link';
import './style.css';

interface propsType {
  href: string | undefined;
  children: string | undefined;
  background: string | undefined;
  color: string | undefined;
}

const SocialBtn: any = ({ href, children, background, color }: propsType) => {
  return (
    <>
      <br></br>
      <Link
        className="SocialBtn"
        style={{
          backgroundColor: background ? '#' + background : '#FFFFFF',
          color: color ? '#' + color : '#000000',
        }}
        href={href ? href : ''}
      >
        {children}
      </Link>
    </>
  );
};

export default function Home(): any {
  return (
    <div className="page">
      <center>
        <SocialBtn href="/" background="FE0" color="400">
          Kakao Login
        </SocialBtn>
        <SocialBtn href="/" background="E4D" color="FFF">
          Instagram Login
        </SocialBtn>
        <SocialBtn href="/" background="4B1" color="FFF">
          Naver Login
        </SocialBtn>
        <SocialBtn href="/" background="FFF">
          Google Login
        </SocialBtn>
        <SocialBtn href="/" background="111" color="FFF">
          Apple Login
        </SocialBtn>
      </center>
    </div>
  );
}
