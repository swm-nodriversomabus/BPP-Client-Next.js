import './style.css';
import Navbar from '../../../component/navigationBar';
import ContentBox from '../../../component/contentBox';
import Tabbar from '../../../component/tabBar';
import ListView from '../../../view/listView';
import Link from 'next/link';

export default function Home(): any {
  return (
    <>
      <Navbar
        more
        segment={{ 친구: '/talk', 채팅방: '/talk/list' }}
        segmentIndex="1"
      >
        Talk
      </Navbar>
      <ContentBox>
        <ListView>
          <div className="section">
            <Link href="/talk/room">안녕하세요</Link>
            <Link href="/talk/room">반가워요</Link>
            <Link href="/talk/room">잘있어요</Link>
            <Link href="/talk/room">다시만나요</Link>
          </div>
        </ListView>
      </ContentBox>
      <Tabbar>2</Tabbar>
    </>
  );
}
