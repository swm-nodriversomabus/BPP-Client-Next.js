import Link from 'next/link';
import React from 'react';

const TabItem: any = (Props: {
  children: string | undefined;
  highlight: boolean | undefined;
  link: string | undefined;
}) => {
  return (
    <Link href={Props.link ? Props.link : ''}>
      <div className={`TabItem ${Props.highlight ? 'highlight' : ''}`}>
        <div></div>
        {Props.children}
      </div>
    </Link>
  );
};

export default TabItem;
