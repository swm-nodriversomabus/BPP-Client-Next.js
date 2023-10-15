'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { EventHandler, ReactElement, UIEventHandler } from 'react';
import addcheck from 'public/addcheck.svg';
import addcheck_true from 'public/addcheck_true.svg';
import { useRouter } from 'next/navigation';
import emptyProfile from 'public/empty_profile.png';

const FriendsCheckListItem: any = (Props: {
  children: string | undefined;
  title: string | undefined;
  subtitle: string | undefined;
  checked: boolean | undefined;
  index: number;
  set: any;
  img: number | undefined;
}) => {
  return (
    <div
      onClick={() => {
        Props.set(Props.index);
      }}
      className="ListItemAddToRoom"
    >
      <Image src={emptyProfile} alt="profile" />
      <div>{Props.title}</div>
      <div>{Props.subtitle}</div>
      <Image src={Props.checked ? addcheck_true : addcheck} alt="add check" />
    </div>
  );
};

const FriendsCheckList: any = (Props: { children: string | undefined }) => {
  return <div className="ListView">{Props.children}</div>;
};

export default FriendsCheckList;
export { FriendsCheckListItem };
