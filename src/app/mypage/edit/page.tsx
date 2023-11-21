'use client';

import './style.css';
import Navbar from '@/component/navigationBar';
import ContentBox from '@/component/contentBox';
import emptyProfile from 'public/empty_profile.png';
import Image from 'next/image';
import { RefObject, useEffect, useRef, useState } from 'react';
import api from '@/utils/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home(): any {
  const router = useRouter();
  const [myInfo, setMyInfo] = useState<JSON | null>(null);
  const [myImage, setMyImage] = useState<JSON | null>(null);
  const [username, setUsername] = useState('');
  const [stateMessage, setStateMessage] = useState('');

  const imageUpload: RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);
  api('user', 'get', {}, [myInfo, setMyInfo]);
  api('user/image', 'get', {}, [myImage, setMyImage]);
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
              gender:
                myInfo &&
                'gender' in myInfo &&
                (myInfo as { gender: string }).gender,
              age: myInfo && 'age' in myInfo && (myInfo as { age: number }).age,
              phone:
                myInfo &&
                'phone' in myInfo &&
                (myInfo as { phone: string }).phone,
              role:
                myInfo && 'role' in myInfo && (myInfo as { role: string }).role,
              blacklist:
                myInfo &&
                'blacklist' in myInfo &&
                (myInfo as { blacklist: boolean }).blacklist,
              mannerScore:
                myInfo &&
                'mannerScore' in myInfo &&
                (myInfo as { mannerScore: number }).mannerScore,
              isActive:
                myInfo &&
                'isActive' in myInfo &&
                (myInfo as { isActive: boolean }).isActive,
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
          <Image
            src={emptyProfile}
            width={72}
            height={72}
            alt="image"
            onClick={() => {
              imageUpload.current?.click();
            }}
          />
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
      <input
        type="file"
        ref={imageUpload}
        style={{ display: 'none' }}
        accept="image/*"
        onChange={(e) => {
          if (e.currentTarget.files && e.currentTarget.files.length) {
            if (e.currentTarget.files[0]) {
              const BASE_URL = process.env.NEXT_BASE_URL;
              fetch(BASE_URL + 'user/image', {
                method: 'POST',
                headers: {
                  'Content-Type': e.currentTarget.files[0].type,
                },
                credentials: 'include',
                body: e.currentTarget.files[0],
              }).then((res: Response) => {
                if (res.status == 200) {
                  // 정상 응답 확인된 경우, 응답 받은 JSON 전달}
                  console.log(200);
                }
              });
            }
          }
        }}
      />
    </>
  );
}
