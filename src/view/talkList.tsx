'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { EventHandler, ReactElement, UIEventHandler } from 'react';
import addcheck from 'public/addcheck.svg';
import addcheck_true from 'public/addcheck_true.svg';
import { useRouter } from 'next/navigation';
import emptyProfile from 'public/empty_profile.png';
import emptyProfile_ from 'public/profile1.svg';

const TalkListItem: any = (Props: {
  children: string | undefined;
  title: string | undefined;
  link: string | undefined;
}) => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(Props.link!);
      }}
      className="TalkListItem"
    >
      <div>{Props.title}</div>
    </div>
  );
};

const TalkList: any = (Props: { children: string | undefined }) => {
  return <div className="ListView">{Props.children}</div>;
};

export default TalkList;
export { TalkListItem };
