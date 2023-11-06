'use client';

import './style.css';
import Navbar from '../../component/navigationBar';
import ContentBox from '../../component/contentBox';
import { useState } from 'react';
import api, { mapping } from '@/utils/api';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import noti_new from 'public/noti_new.svg';
import noti_approved from 'public/noti_approved.svg';
import noti_reject from 'public/noti_reject.svg';

// [
//   {
//     notificationId: 1,
//     type: '1',
//     content: 'string',
//     createdAt: [2023, 10, 18, 8, 53, 45],
//     updatedAt: [2023, 10, 18, 8, 53, 45],
//     isActive: true,
//   },
//   {
//     notificationId: 1,
//     type: '2',
//     content: 'string',
//     createdAt: [2023, 10, 18, 8, 53, 45],
//     updatedAt: [2023, 10, 18, 8, 53, 45],
//     isActive: true,
//   },
//   {
//     notificationId: 1,
//     type: '3',
//     content: 'string',
//     createdAt: [2023, 10, 18, 8, 53, 45],
//     updatedAt: [2023, 10, 18, 8, 53, 45],
//     isActive: true,
//   },
// ]

export default function Home(): any {
  const router = useRouter();
  const [notification, setNotification] = useState(null);
  api('user/notification', 'get', {}, [notification, setNotification]);
  return (
    <>
      <Navbar back=" ">알림</Navbar>
      <ContentBox>
        {mapping(notification, (item: any, index: number) => {
          switch (item.type) {
            case '1':
              return (
                <div
                  className="NotificationItem"
                  onClick={() => {
                    router.push(`../match/room/${1}`);
                  }}
                  key={index}
                >
                  <Image src={noti_new} alt="icon" />
                  <div>{'메이트 신청 알림'}</div>
                  <div>{'메이트 신청이 들어왔어요!'}</div>
                  <div>{item.content}</div>
                  <div>{`${item.createdAt[0]}.${item.createdAt[1]}.${item.createdAt[2]}`}</div>
                </div>
              );
            case '2':
              return (
                <div
                  className="NotificationItem"
                  onClick={() => {
                    router.push(`../match/room/${1}`);
                  }}
                  key={index}
                >
                  <Image src={noti_approved} alt="icon" />
                  <div>{'메이트 성사 알림'}</div>
                  <div>{'함께 할 메이트가 생겼어요!'}</div>
                  <div>{item.content}</div>
                  <div>{`${item.createdAt[0]}.${item.createdAt[1]}.${item.createdAt[2]}`}</div>
                </div>
              );
            case '3':
              return (
                <div
                  className="NotificationItem"
                  onClick={() => {
                    // router.push(`../match/room/${1}`);
                  }}
                  key={index}
                >
                  <Image src={noti_reject} alt="icon" />
                  <div>{'메이트 거절 알림'}</div>
                  <div>{'메이트 신청이 거절되었어요.'}</div>
                  <div>{item.content}</div>
                  <div>{`${item.createdAt[0]}.${item.createdAt[1]}.${item.createdAt[2]}`}</div>
                </div>
              );
            default:
              return <></>;
          }
        })}
      </ContentBox>
    </>
  );
}
