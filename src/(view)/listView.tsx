import React from "react";

const ListView: any = (Props: {
  children: string | undefined;
  link: string | undefined;
}) => {
  return <div className="ListView">{Props.children}</div>;
};

export default ListView;
