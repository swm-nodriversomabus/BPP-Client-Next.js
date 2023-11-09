'use client';

import './style.css';
import Navbar from '@/component/navigationBar';
import ContentBox from '@/component/contentBox';
import emptyProfile from 'public/empty_profile.png';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import api from '@/utils/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home(): any {
  const router = useRouter();
  const [myInfo, setMyInfo] = useState<JSON | null>(null);
  const [username, setUsername] = useState('');
  const [stateMessage, setStateMessage] = useState('');
  api('user', 'get', {}, [myInfo, setMyInfo]);
  useEffect(() => {
    if (!myInfo || !('username' in myInfo) || !('stateMessage' in myInfo))
      return;
    setUsername((myInfo as { username: string }).username);
    setStateMessage((myInfo as { stateMessage: string }).stateMessage);
  }, [myInfo]);

  return (
    <>
      <Navbar
        back=" "
        btn="완료"
        btnOnClick={() => {
          api(
            'user',
            'put',
            {
              username: username,
              stateMessage: stateMessage,
            },
            [
              null,
              (json) => {
                if (json && !('api_response_code' in json)) {
                  history.back();
                }
              },
            ]
          );
        }}
      >
        마이페이지
      </Navbar>
      <ContentBox>
        <div className="MyProfile">
          <Image src={emptyProfile} width={72} alt="image" />
          <input
            onChange={(e: any) => {
              setUsername(
                e.target.value
                  .replaceAll(/[^0-9a-zA-Zㄱ-ㅎ가-힣 ]/gi, '')
                  .substring(0, 30)
                //replaceAll(/[\t&|="';]/gi, '')
              );
            }}
            value={username}
          />
          <input
            onChange={(e: any) => {
              setStateMessage(
                e.target.value.replaceAll(/[\t&|="';]/gi, '').substring(0, 200)
              );
            }}
            value={stateMessage}
          />
        </div>
      </ContentBox>
    </>
  );
}
