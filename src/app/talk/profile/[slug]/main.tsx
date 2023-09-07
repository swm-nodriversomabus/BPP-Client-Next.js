'use client';

import './style.css';
import Navbar from '@/component/navigationBar';
import ContentBox from '@/component/contentBox';
import Image from 'next/image';
import profileButtons from 'public/profileButtons.svg';
import profile0 from 'public/profile0.svg';
import profile1 from 'public/profile1.svg';
import profile2 from 'public/profile2.svg';
import profile3 from 'public/profile3.svg';
import profile4 from 'public/profile4.svg';
import profile5 from 'public/profile5.svg';
import profile6 from 'public/profile6.svg';
import profile7 from 'public/profile7.svg';
import profile8 from 'public/profile8.svg';
import profile9 from 'public/profile9.svg';
import profile_btn_1 from 'public/profile_btn_1.svg';
import profile_btn_2 from 'public/profile_btn_2.svg';
import profile_btn_3 from 'public/profile_btn_3.svg';

const profileImg: Array<any> = [
  profile0,
  profile1,
  profile2,
  profile3,
  profile4,
  profile5,
  profile6,
  profile7,
  profile8,
  profile9,
];

let friendsData: Array<{
  img: number;
  title: string;
  subtitle: string;
  checked: boolean | undefined;
}> = [
  {
    img: 1,
    title: 'ENTP남',
    subtitle: '대문자 P',
    checked: undefined,
  },
  { img: 2, title: '곽튜브', subtitle: '이거 재밌네?', checked: false },
  { img: 3, title: '또떠녀', subtitle: '또 떠나는 여행', checked: false },
  { img: 4, title: '소마소마', subtitle: '14기 화이팅!', checked: false },
  {
    img: 6,
    title: '마에스트로',
    subtitle: '불러 maestro maestro',
    checked: false,
  },
  { img: 5, title: '효남이', subtitle: '냥냥펀치', checked: false },
  { img: 7, title: '파리지앵', subtitle: '파리바게뜨', checked: false },
  { img: 8, title: '킹갓엠퍼러용명', subtitle: '상메는 상메', checked: false },
];

export default function Main({ slug }: { slug: number }): any {
  return (
    <>
      <Navbar back=" "> </Navbar>
      <Image
        src={profileImg[friendsData[slug].img]}
        alt="image"
        style={{
          width: '112px',
          height: '112px',
          marginLeft: '-56px',
          marginTop: '-86px',
          left: '50%',
          top: '50%',
          position: 'absolute',
          zIndex: '99',
        }}
      />
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
        {friendsData[slug].title}
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
        {friendsData[slug].subtitle}
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
