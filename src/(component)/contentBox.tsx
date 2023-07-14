import React from "react";

const ContentBox: any = (Props: { children: string | undefined }) => {
  return <div className="ContentBox">{Props.children}</div>;
};

export default ContentBox;
