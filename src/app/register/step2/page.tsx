import '../style.css';
import Navbar from '@/component/navigationBar';
import ContentBox from '@/component/contentBox';
import Image from 'next/image';
import addcheck from 'public/addcheck.svg';
import Link from 'next/link';

export default function Home(): any {
  return (
    <>
      <Navbar back=" ">회원가입</Navbar>
      <ContentBox>
        <div
          style={{
            marginTop: '20px',
            marginLeft: '20px',
            float: 'left',
            background: '#F0F0F2',
            width: '31px',
            height: '31px',
            borderRadius: '31px',
            color: '#A8A8A8',
            lineHeight: '31px',
            textAlign: 'center',
            fontSize: '14px',
            marginRight: '10px',
          }}
        >
          1
        </div>
        <div
          style={{
            marginTop: '20px',
            float: 'left',
            background: '#8638EA',
            width: '31px',
            height: '31px',
            borderRadius: '31px',
            color: '#fff',
            lineHeight: '31px',
            textAlign: 'center',
            fontSize: '14px',
            marginRight: '10px',
          }}
        >
          2
        </div>
        <div
          style={{
            marginTop: '20px',
            float: 'left',
            background: '#F0F0F2',
            width: '31px',
            height: '31px',
            borderRadius: '31px',
            color: '#A8A8A8',
            lineHeight: '31px',
            textAlign: 'center',
            fontSize: '14px',
            marginRight: '10px',
          }}
        >
          3
        </div>
        <div
          style={{
            marginBottom: '10px',
            marginLeft: '20px',
            color: '#212121',
            fontSize: '22px',
            width: '100%',
            position: 'relative',
            display: 'inline-block',
            fontWeight: 'bold',
            lineHeight: '60px',
            height: '60px',
          }}
        >
          계정 정보
        </div>
        <div
          style={{
            marginLeft: '20px',
            color: '#212121',
            fontSize: '14px',
            width: '100%',
            position: 'relative',
            display: 'inline-block',
            fontWeight: 'bold',
            lineHeight: '30px',
            height: '30px',
          }}
        >
          이름
        </div>
        <input
          style={{
            boxSizing: 'border-box',
            width: 'calc(100% - 40px)',
            border: 'solid 1px #EEEEF0',
            padding: '16px',
            margin: 'none',
            marginLeft: '20px',
            height: '48px',
            borderRadius: '4px',
            fontSize: '15px',
          }}
          value="본명을 작성하세요"
        />
        <div
          style={{
            marginLeft: '20px',
            color: '#212121',
            fontSize: '14px',
            width: '100%',
            position: 'relative',
            display: 'inline-block',
            fontWeight: 'bold',
            lineHeight: '30px',
            height: '30px',
            marginTop: '30px',
          }}
        >
          닉네임
        </div>
        <input
          style={{
            boxSizing: 'border-box',
            width: 'calc(100% - 136px)',
            border: 'solid 1px #EEEEF0',
            padding: '16px',
            margin: 'none',
            marginLeft: '20px',
            height: '48px',
            borderRadius: '4px',
            fontSize: '15px',
          }}
          value="여행파티 서비스 내에서"
        />
        <button
          style={{
            boxSizing: 'border-box',
            marginLeft: '8px',
            height: '48px',
            width: '88px',
            border: 'none',
            borderRadius: '8px',
            backgroundColor: '#D2D2D1',
            color: '#fff',
            fontSize: '15px',
          }}
        >
          중복검사
        </button>
        <div
          style={{
            marginLeft: '20px',
            color: '#212121',
            fontSize: '14px',
            width: '100%',
            position: 'relative',
            display: 'inline-block',
            fontWeight: 'bold',
            lineHeight: '30px',
            height: '30px',
            marginTop: '30px',
          }}
        >
          이메일
        </div>
        <input
          style={{
            boxSizing: 'border-box',
            width: 'calc(100% - 40px)',
            border: 'solid 1px #EEEEF0',
            padding: '16px',
            margin: 'none',
            marginLeft: '20px',
            height: '48px',
            borderRadius: '4px',
            fontSize: '15px',
          }}
          value=""
        />
        <div
          style={{
            marginLeft: '20px',
            color: '#212121',
            fontSize: '14px',
            width: '100%',
            position: 'relative',
            display: 'inline-block',
            fontWeight: 'bold',
            lineHeight: '30px',
            height: '30px',
            marginTop: '30px',
          }}
        >
          연락처
        </div>
        <input
          style={{
            boxSizing: 'border-box',
            width: 'calc(100% - 136px)',
            border: 'solid 1px #EEEEF0',
            padding: '16px',
            margin: 'none',
            marginLeft: '20px',
            height: '48px',
            borderRadius: '4px',
            fontSize: '15px',
          }}
          value=""
        />
        <button
          style={{
            boxSizing: 'border-box',
            marginLeft: '8px',
            height: '48px',
            width: '88px',
            border: 'none',
            borderRadius: '8px',
            backgroundColor: '#D2D2D1',
            color: '#fff',
            fontSize: '15px',
          }}
        >
          인증
        </button>
        <div style={{ width: '100%', height: '100px' }} />
      </ContentBox>
      <Link href="step1">
        <button
          style={{
            boxSizing: 'border-box',
            bottom: '20px',
            marginLeft: '20px',
            position: 'absolute',
            height: '52px',
            width: 'calc(50% - 30px)',
            border: 'solid 1px #C2C2C2',
            borderRadius: '8px',
            backgroundColor: '#fff',
            color: '#212121',
            fontSize: '16px',
          }}
        >
          이전
        </button>
      </Link>
      <Link href="step3">
        <button
          style={{
            right: '0',
            boxSizing: 'border-box',
            bottom: '20px',
            marginRight: '20px',
            position: 'absolute',
            height: '52px',
            width: 'calc(50% - 30px)',
            border: 'none',
            borderRadius: '8px',
            backgroundColor: '#D2D2D1',
            color: '#fff',
            fontSize: '16px',
          }}
        >
          다음
        </button>
      </Link>
    </>
  );
}
