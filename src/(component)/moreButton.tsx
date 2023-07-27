'use client';

import Image from 'next/image';

const MoreButton: any = (Props: { children: string | undefined }) => {
  return (
    <div className="MoreButton">
      <Image src="/more.svg" alt="더 보기" width={24} height={24}></Image>
      {Props.children}
    </div>
  );
};

export default MoreButton;
