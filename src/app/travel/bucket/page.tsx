import './style.css';
import Navbar from '../../../component/navigationBar';
import ContentBox from '../../../component/contentBox';
import Tabbar from '../../../component/tabBar';

export default function Home(): any {
  return (
    <>
      <Navbar
        more
        segmentIndex={1}
        segment={{ '추천 여행지': '/travel', '버킷 목록': '/travel/bucket' }}
      >
        Travel
      </Navbar>
      <ContentBox></ContentBox>
      <Tabbar>4</Tabbar>
    </>
  );
}
