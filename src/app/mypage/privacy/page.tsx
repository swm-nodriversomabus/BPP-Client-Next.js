'use client';

import './style.css';
import Navbar from '@/component/navigationBar';
import ContentBox from '@/component/contentBox';
import api from '@/utils/api';
import PrivacyDocs from '@/docs/privacy';

export default function Home(): any {
  return (
    <>
      <Navbar back=" ">개인정보 처리방침</Navbar>
      <ContentBox>
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
            marginTop: '10px',
          }}
        >
          <div
            style={{
              fontWeight: 'bold',
              marginLeft: '0px',
              color: '#212121',
              fontSize: '16px',
              float: 'left',
            }}
          >
            개인정보처리방침
          </div>
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
      </ContentBox>
    </>
  );
}
