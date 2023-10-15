'use client';

import './style.css';
import Navbar from '../../component/navigationBar';
import ContentBox from '../../component/contentBox';
import { useState } from 'react';
import api, { mapping } from '@/utils/api';
import Image from 'next/image';
import noti_new from 'public/noti_new.svg';
import { useRouter } from 'next/navigation';

export default function Home(): any {
  const router = useRouter();
  const [notification, setNotification] = useState(null);
  api('{id}/notification', 'get', {}, [notification, setNotification]);
  return (
    <>
      <Navbar back=" ">알림</Navbar>
      <ContentBox>
        {mapping(notification, (item: any, index: number) => {
          switch (item.type) {
            default:
              return (
                <div
                  className="NotificationItem"
                  onClick={() => {
                    // router.push(`../match/room/${1}`);
                  }}
                >
                  <Image src={noti_new} alt="icon" />
                  <div>{'메이트 신청 알림'}</div>
                  <div>{'메이트 신청이 들어왔어요!'}</div>
                  <div>{item.content}</div>
                  <div>{`${item.createdAt[0]}.${item.createdAt[1]}.${item.createdAt[2]}`}</div>
                </div>
              );
              break;
          }
        })}
      </ContentBox>
    </>
  );
}
