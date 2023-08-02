import './style.css';
import Navbar from '@/component/navigationBar';
import ContentBox from '@/component/contentBox';
import Tabbar from '@/component/tabBar';
import MatchScrollView from '@/view/matchScrollView';
import Link from 'next/link';
import MatchSegment from '@/component/matchSegment';
import SearchBar from '@/component/searchBar';
import MyMatch from '@/component/myMatch';
import MatchRecommend from '@/component/matchRecommend';

export default function Home(): any {
  return (
    <>
      <Navbar more>Match</Navbar>
      <ContentBox>
        <MatchScrollView>
          <MatchSegment />
          <SearchBar />
          <MyMatch></MyMatch>
          <MatchRecommend></MatchRecommend>
        </MatchScrollView>
      </ContentBox>
      <Tabbar>3</Tabbar>
    </>
  );
}
