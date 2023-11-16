'use client';

import '../style.css';
import Navbar from '@/component/navigationBar';
import ContentBox from '@/component/contentBox';
import Image from 'next/image';
import addcheck from 'public/addcheck.svg';
import addcheck_true from 'public/addcheck_true.svg';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TermsDocs from '@/docs/terms';
import PrivacyDocs from '@/docs/privacy';

export default function Home({
  setValues,
  prevStep,
  nextStep,
}: {
  setValues: () => void;
  prevStep: () => void;
  nextStep: () => void;
}): any {
  const [checkBox_1, setCheckBox_1] = useState(false);
  const [checkBox_2, setCheckBox_2] = useState(false);
  const [nextBtnAvailable, setNextBtnAvailable] = useState(false);
  useEffect(() => {
    if (checkBox_1 && checkBox_2) {
      setNextBtnAvailable(true);
    } else {
      setNextBtnAvailable(false);
    }
  }, [checkBox_1, checkBox_2]);
  const router = useRouter();
  return (
    <>
      <Navbar back=" ">회원가입</Navbar>
      <ContentBox>
        <div
          style={{
            marginTop: '20px',
            marginLeft: '20px',
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
          1
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
          약관동의
        </div>
        <div
          style={{
            marginLeft: '20px',
            color: '#212121',
            fontSize: '18px',
            width: 'calc(100% - 40px)',
            position: 'relative',
            display: 'inline-block',
            fontWeight: 'bold',
            lineHeight: '50px',
            height: '50px',
          }}
        >
          모두 동의합니다
          <Image
            onClick={() => {
              if (nextBtnAvailable) {
                setCheckBox_1(false);
                setCheckBox_2(false);
              } else {
                setCheckBox_1(true);
                setCheckBox_2(true);
              }
            }}
            src={nextBtnAvailable ? addcheck_true : addcheck}
            style={{ float: 'right', marginTop: '12px' }}
            alt="check"
          />
        </div>
        <div
          style={{
            boxSizing: 'border-box',
            marginLeft: '20px',
            color: '#212121',
            fontSize: '14px',
            width: 'calc(100% - 40px)',
            position: 'relative',
            display: 'inline-block',
            lineHeight: '22px',
            height: '150px',
            border: 'solid 1px #EEEEF0',
            padding: '16px',
            marginBottom: '15px',
          }}
        >
          <div style={{ color: '#FF5F49', fontSize: '16px', float: 'left' }}>
            필수
          </div>
          <div
            style={{
              fontWeight: 'bold',
              marginLeft: '6px',
              color: '#212121',
              fontSize: '16px',
              float: 'left',
            }}
          >
            이용약관
          </div>
          <Image
            onClick={() => {
              setCheckBox_1(!checkBox_1);
            }}
            src={checkBox_1 ? addcheck_true : addcheck}
            style={{ float: 'right', marginTop: '-2px' }}
            alt="check"
          />
          <div
            style={{
              boxSizing: 'border-box',
              display: 'inline-block',
              marginLeft: '6px',
              color: '#737373',
              fontSize: '13px',
              width: '100%',
              border: 'none',
              margin: '0',
              marginTop: '10px',
              padding: '0',
              resize: 'none',
              height: '100px',
              lineHeight: '19.5px',
              overflowY: 'auto',
            }}
          >
            <TermsDocs />
          </div>
        </div>

        <div
          style={{
            boxSizing: 'border-box',
            marginLeft: '20px',
            color: '#212121',
            fontSize: '14px',
            width: 'calc(100% - 40px)',
            position: 'relative',
            display: 'inline-block',
            lineHeight: '22px',
            height: '150px',
            border: 'solid 1px #EEEEF0',
            padding: '16px',
            marginBottom: '15px',
          }}
        >
          <div style={{ color: '#FF5F49', fontSize: '16px', float: 'left' }}>
            필수
          </div>
          <div
            style={{
              fontWeight: 'bold',
              marginLeft: '6px',
              color: '#212121',
              fontSize: '16px',
              float: 'left',
            }}
          >
            개인정보 처리방침
          </div>
          <Image
            onClick={() => {
              setCheckBox_2(!checkBox_2);
            }}
            src={checkBox_2 ? addcheck_true : addcheck}
            style={{ float: 'right', marginTop: '-2px' }}
            alt="check"
          />
          <div
            style={{
              boxSizing: 'border-box',
              display: 'inline-block',
              marginLeft: '6px',
              color: '#737373',
              fontSize: '13px',
              width: '100%',
              border: 'none',
              margin: '0',
              marginTop: '10px',
              padding: '0',
              resize: 'none',
              height: '100px',
              lineHeight: '19.5px',
              overflowY: 'auto',
            }}
          >
            <PrivacyDocs />
          </div>
        </div>

        <div style={{ width: '100%', height: '100px' }} />
      </ContentBox>
      <button
        onClick={() => {
          if (nextBtnAvailable) {
            nextStep();
            //router.push('step2');
          }
        }}
        style={{
          boxSizing: 'border-box',
          bottom: '20px',
          marginLeft: '20px',
          position: 'absolute',
          height: '52px',
          width: 'calc(100% - 40px)',
          border: 'none',
          borderRadius: '8px',
          backgroundColor: nextBtnAvailable ? '#8638EA' : '#D2D2D1',
          color: '#fff',
          fontSize: '16px',
        }}
      >
        다음
      </button>
    </>
  );
}
