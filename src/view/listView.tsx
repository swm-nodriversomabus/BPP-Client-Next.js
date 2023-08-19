'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { EventHandler, ReactElement, UIEventHandler } from 'react';
import addcheck from 'public/addcheck.svg';
import addcheck_true from 'public/addcheck_true.svg';
import { useRouter } from 'next/navigation';
import profile1 from 'public/profile1.svg';
import profile2 from 'public/profile2.svg';
import profile3 from 'public/profile3.svg';

const ListItem: any = (Props: {
  children: string | undefined;
  title: string | undefined;
  subtitle: string | undefined;
  link: string | undefined;
}) => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(Props.link!);
      }}
      className="ListItem"
    >
      <Image
        src={
          Math.random() > 0.66
            ? Math.random() > 0.5
              ? profile1
              : profile2
            : profile3
        }
        alt="profile"
      />
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
}) => {
  return (
    <div
      onClick={() => {
        Props.set(Props.index);
      }}
      className="ListItemAddToRoom"
    >
      <Image
        src={
          Math.random() > 0.66
            ? Math.random() > 0.5
              ? profile1
              : profile2
            : profile3
        }
        alt="profile"
      />
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
