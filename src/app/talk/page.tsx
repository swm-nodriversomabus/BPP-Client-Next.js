import './style.css';
import Navbar from '../../component/navigationBar';
import ContentBox from '../../component/contentBox';
import Tabbar from '../../component/tabBar';
import ListView from '../../view/listView';
import Link from 'next/link';

export default function Home(): any {
  return (
    <>
      <Navbar more segment={{ 친구: '/talk', 채팅방: '/talk/list' }}>
        Talk
      </Navbar>
      <ContentBox withSegment>
        <ListView>
          <div className="section">
            <Link href="/talk/room">용용이</Link>
            <Link href="/talk/room">명명이</Link>
            <Link href="/talk/room">갓용명</Link>
          </div>
        </ListView>
      </ContentBox>
      <Tabbar>2</Tabbar>
    </>
  );
}
