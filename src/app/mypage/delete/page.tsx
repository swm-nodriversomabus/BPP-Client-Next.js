'use client';

import './style.css';
import Navbar from '@/component/navigationBar';
import ContentBox from '@/component/contentBox';
import api from '@/utils/api';
import PrivacyDocs from '@/docs/privacy';
import { useState } from 'react';

export default function Home(): any {
  const confirmCheck: string = '계정을 삭제하겠습니다';
  const [confirmText, setConfirmText] = useState('');
  return (
    <>
      <Navbar back=" ">서비스 탈퇴하기</Navbar>
      <ContentBox>
        <div
          style={{
            padding: '20px',
          }}
        >
          서비스 탈퇴를 하면, 본 계정과 연계된 정보가 모두 삭제되며 이는 돌이킬
          수 없습니다.
          <br />
          {`계속 진행하려면, "계정을 삭제하겠습니다" 라고 입력해주세요.`}
          <br />
          <input
            style={{
              marginTop: '20px',
              border: 'solid 1px #aaa',
              height: '28px',
              borderRadius: '5px',
              width: '100%',
              fontSize: '16px',
            }}
            onChange={(e: any) => {
              setConfirmText(
                e.target.value.replaceAll(/[\t&|="';]/gi, '').substring(0, 30)
              );
            }}
            value={confirmText}
          />
          <button
            style={{
              marginTop: '20px',
              border: 'none',
              height: '28px',
              borderRadius: '5px',
              width: '100%',
              fontSize: '16px',
              backgroundColor: '#f00',
              color: '#fff',
            }}
            onClick={() => {
              if (confirmText == confirmCheck) {
                api('user', 'delete', {}, [
                  null,
                  () => {
                    window.location.replace('../login');
                  },
                ]);
              }
            }}
          >
            삭제
          </button>
        </div>
      </ContentBox>
    </>
  );
}
