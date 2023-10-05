'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { EventHandler, ReactElement, UIEventHandler } from 'react';
import addcheck from 'public/addcheck.svg';
import addcheck_true from 'public/addcheck_true.svg';
import { useRouter } from 'next/navigation';
import profile0 from 'public/profile0.svg';
import profile1 from 'public/profile1.svg';
import profile2 from 'public/profile2.svg';
import profile3 from 'public/profile3.svg';
import profile4 from 'public/profile4.svg';
import profile5 from 'public/profile5.svg';
import profile6 from 'public/profile6.svg';
import profile7 from 'public/profile7.svg';
import profile8 from 'public/profile8.svg';
import profile9 from 'public/profile9.svg';

const profileImg: Array<any> = [
  profile0,
  profile1,
  profile2,
  profile3,
  profile4,
  profile5,
  profile6,
  profile7,
  profile8,
  profile9,
];

const ListItem: any = (Props: {
  children: string | undefined;
  title: string | undefined;
  subtitle: string | undefined;
  link: string | undefined;
  img: number | undefined;
}) => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(Props.link!);
      }}
      className="ListItem"
    >
      <Image src={profileImg[Number(Props.img)]} alt="profile" />
      <div>{Props.title}</div>
      <div>{Props.subtitle}</div>
    </div>
  );
};

const ListItemAddToRoom: any = (Props: {
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
      <Image src={profileImg[Number(Props.img)]} alt="profile" />
      <div>{Props.title}</div>
      <div>{Props.subtitle}</div>
      <Image src={Props.checked ? addcheck_true : addcheck} alt="add check" />
    </div>
  );
};

const ListView: any = (Props: { children: string | undefined }) => {
  return <div className="ListView">{Props.children}</div>;
};

export default ListView;
export { ListItem, ListItemAddToRoom };
