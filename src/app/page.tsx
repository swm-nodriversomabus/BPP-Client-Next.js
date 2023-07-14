import Link from 'next/link';
import Navbar from '@/(component)/navigationBar';
import Tabbar from '@/(component)/tabBar';
import ListView from '@/(view)/listView';
import ContentBox from '@/(component)/contentBox';

export default function Home(): any {
  return (
    <>
      <Navbar more>여행 파티</Navbar>
      <ContentBox>
        <ListView>
          <div className="section">
            <Link href="join">소셜 로그인 예시</Link>
          </div>
        </ListView>
      </ContentBox>
      <Tabbar></Tabbar>
    </>
  );
}
