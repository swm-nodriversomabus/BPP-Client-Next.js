import Image from 'next/image';
import Link from 'next/link';
import React, { UIEventHandler, useEffect, useState } from 'react';
import close from 'public/close.svg';

const ModalView: any = (Props: {
  children: string | undefined;
  link: string | undefined;
  onClickProp: () => void | undefined;
  title: string | undefined;
  button: string | undefined;
  display: boolean | undefined;
  setDisplay: any;
}) => {
  if (!Props.display) return <></>;
  return (
    <>
      <div className="ModalBackground"></div>
      <div className="ModalView">
        <div>
          <Image
            onClick={() => {
              Props.setDisplay(false);
            }}
            src={close}
            alt="close"
          />
          <div>{Props.title}</div>
          <Link href={Props.link ? Props.link : ''}>
            <div onClick={Props.onClickProp ? Props.onClickProp : () => {}}>
              {Props.button}
            </div>
          </Link>
        </div>
        <div>{Props.children}</div>
      </div>
    </>
  );
};

export default ModalView;
