import React from 'react';

const ContentView: any = (Props: { children: string | undefined }) => {
  return <div className="contentview">{Props.children}</div>;
};

export default ContentView;
