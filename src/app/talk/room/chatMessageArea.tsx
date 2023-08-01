import { UIEventHandler } from 'react';

interface propsType {
  children: JSX.Element;
  onScroll: UIEventHandler;
  inheritRef: any;
  isReachingEnd: boolean | undefined;
}

export default function ChatMessageArea({
  children,
  onScroll,
  inheritRef,
  isReachingEnd,
}: propsType) {
  return (
    <div onScroll={onScroll} className="chatMessageArea" ref={inheritRef}>
      {children}
    </div>
  );
}
