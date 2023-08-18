import React, { UIEventHandler } from 'react';

const ContentBox: any = (Props: {
  children: string | undefined;
  onScroll: UIEventHandler | undefined;
  inheritRef: any;
  isReachingEnd: boolean | undefined;
  withSegment: boolean | undefined;
  styled: object | undefined;
}) => {
  return (
    <div
      style={Props.styled ? Props.styled : {}}
      onScroll={Props.onScroll}
      ref={Props.inheritRef}
      className={`ContentBox ${Props.withSegment ? 'withSegment' : ''}`}
    >
      {Props.children}
    </div>
  );
};

export default ContentBox;
