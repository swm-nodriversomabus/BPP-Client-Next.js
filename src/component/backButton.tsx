'use client';

import Image from 'next/image';

const BackButton: any = (Props: { children: string | undefined }) => {
  return (
    <div
      className="BackButton"
      onClick={() => {
        history.back();
      }}
    >
      <Image src="/back.svg" alt="뒤로가기" width={12} height={21}></Image>
      {Props.children}
    </div>
  );
};

export default BackButton;
