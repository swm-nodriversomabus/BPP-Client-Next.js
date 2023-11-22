/* eslint-disable @next/next/no-img-element */
'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, {
  EventHandler,
  ReactElement,
  UIEventHandler,
  useState,
} from 'react';
import addcheck from 'public/addcheck.svg';
import addcheck_true from 'public/addcheck_true.svg';
import { useRouter } from 'next/navigation';
import emptyProfile from 'public/empty_profile.png';

const FriendsListItem: any = (Props: {
  children: string | undefined;
  title: string | undefined;
  subtitle: string | undefined;
  link: string | undefined;
  img: string | undefined;
}) => {
  const router = useRouter();
  const [isImage, setIsImage] = useState(true);
  const BASE_URL: string = process.env.NEXT_BASE_URL
    ? process.env.NEXT_BASE_URL
    : '';
  const CLIENT: string = process.env.NEXT_CLIENT ? process.env.NEXT_CLIENT : '';
  return (
    <div
      onClick={() => {
        if (!Props.link) return;
        if (Props.link.indexOf('://') > -1) {
          window.open(Props.link);
          return;
        }
        router.push(Props.link.replace('~', CLIENT));
      }}
      className="ListItem"
    >
      {isImage ? (
        <img
          src={Props.img ? Props.img.replace('~', BASE_URL) : ''}
          onError={(e) => {
            setIsImage(false);
          }}
          width={48}
          height={48}
          alt="image"
        />
      ) : (
        <Image src={emptyProfile} width={48} height={48} alt="image" />
      )}
      <div>{Props.title}</div>
      <div>{Props.subtitle}</div>
    </div>
  );
};

const FriendsList: any = (Props: { children: string | undefined }) => {
  return <div className="ListView">{Props.children}</div>;
};

export default FriendsList;
export { FriendsListItem };
