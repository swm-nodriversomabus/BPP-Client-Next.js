'use client';
import '../style.css';
import Navbar from '@/component/navigationBar';
import ContentBox from '@/component/contentBox';
import Image from 'next/image';
import addcheck from 'public/addcheck.svg';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/utils/api';

export default function Home({
  setValues,
  prevStep,
  nextStep,
}: {
  setValues: (name: string, value: string) => void;
  prevStep: () => void;
  nextStep: () => void;
}): any {
  const [confirmFailed, setConfirmFailed] = useState(false);
  const [nameValue, setNameValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [confirmValue, setConfirmValue] = useState('');
  const [confirmStep, setConfirmStep] = useState(0);
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
          placeholder="본명을 입력하세요"
          value={nameValue}
          onChange={(e: any) => {
            setNameValue(e.target.value);
          }}
          maxLength={30}
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
          value={`${phoneValue.substring(0, 3)}${
            phoneValue.length > 3 ? '-' : ''
          }${phoneValue.substring(3, 7)}${
            phoneValue.length > 7 ? '-' : ''
          }${phoneValue.substring(7, 11)}`}
          onChange={(e: any) => {
            setPhoneValue(
              e.target.value.replaceAll(/[^\d]/gi, '').substring(0, 11)
            );
          }}
        />
        <button
          onClick={() => {
            if (!confirmStep && phoneValue.length >= 11) {
              api(`sms/code/${phoneValue}`, 'get', {}, [
                null,
                (json: any) => {
                  if ('api_response_code' in json) {
                    return;
                  }
                  setConfirmStep(1);
                },
              ]);
            }
          }}
          style={{
            boxSizing: 'border-box',
            marginLeft: '8px',
            height: '48px',
            width: '88px',
            border: 'none',
            borderRadius: '8px',
            backgroundColor:
              phoneValue.length >= 11 && confirmStep == 0
                ? '#8638EA'
                : '#D2D2D1',
            color: '#fff',
            fontSize: '15px',
          }}
        >
          {confirmStep < 2 ? '인증' : '인증완료'}
        </button>
        <div style={{ width: '100%', height: '20px' }} />
        <input
          style={{
            display: confirmStep == 1 ? 'inline-block' : 'none',
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
          value={confirmValue}
          onChange={(e: any) => {
            setConfirmValue(
              e.target.value.replaceAll(/[^\d]/gi, '').substring(0, 6)
            );
          }}
        />
        <button
          onClick={() => {
            if (confirmValue.length >= 6) {
              api(
                `sms/code`,
                'post',
                { phone: phoneValue, code: confirmValue },
                [
                  null,
                  (json: any) => {
                    if (
                      'api_response_code' in json &&
                      json.api_response_code == 400
                    ) {
                      setConfirmFailed(true);
                      setConfirmValue('');
                    } else if (!('api_response_code' in json)) {
                      setConfirmStep(2);
                    }
                  },
                ]
              );
            }
          }}
          style={{
            display: confirmStep == 1 ? 'inline-block' : 'none',
            boxSizing: 'border-box',
            marginLeft: '8px',
            height: '48px',
            width: '88px',
            border: 'none',
            borderRadius: '8px',
            backgroundColor: confirmValue.length >= 6 ? '#8638EA' : '#D2D2D1',
            color: '#fff',
            fontSize: '15px',
          }}
        >
          확인
        </button>
        <div
          style={{
            display: confirmFailed ? 'inline-block' : 'none',
            marginLeft: '20px',
            color: '#ee2222',
            fontSize: '14px',
            width: '100%',
            position: 'relative',
            fontWeight: 'bold',
            lineHeight: '30px',
            height: '30px',
            marginTop: '0px',
          }}
        >
          인증번호가 일치하지 않습니다.
        </div>
        <div style={{ width: '100%', height: '100px' }} />
      </ContentBox>
      <button
        onClick={() => {
          prevStep();
        }}
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
      <button
        onClick={() => {
          if (nameValue && phoneValue && confirmValue && confirmStep == 2) {
            setValues('name', nameValue);
            setValues('phone', phoneValue);
            setValues('confirm', confirmValue);
            nextStep();
            //router.push('step3');
          }
        }}
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
          backgroundColor:
            nameValue && phoneValue && confirmValue && confirmStep == 2
              ? '#8638EA'
              : '#D2D2D1',
          color: '#fff',
          fontSize: '16px',
        }}
      >
        다음
      </button>
    </>
  );
}
