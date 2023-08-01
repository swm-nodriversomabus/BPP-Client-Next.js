import React, { UIEventHandler } from 'react';

const MathScrollView: any = (Props: { children: string | undefined }) => {
  return <div className="MathScrollView">{Props.children}</div>;
};

export default MathScrollView;
