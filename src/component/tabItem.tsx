import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

const TabItem: any = (Props: {
  children: string | undefined;
  highlight: boolean | undefined;
  link: string | undefined;
  img: string | undefined;
}) => {
  return (
    <Link href={Props.link ? Props.link : ''}>
      <div className={`TabItem ${Props.highlight ? 'highlight' : ''}`}>
        <div>
          <Image
            src={`/icon_${Props.img}${Props.highlight ? '_highlight' : ''}.svg`}
            width={24}
            height={24}
            alt="tab"
          />
        </div>
        {Props.children}
      </div>
    </Link>
  );
};

export default TabItem;
