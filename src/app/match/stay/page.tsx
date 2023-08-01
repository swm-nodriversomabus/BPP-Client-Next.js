import './style.css';
import Navbar from '../../../component/navigationBar';
import ContentBox from '../../../component/contentBox';
import Tabbar from '../../../component/tabBar';

export default function Home(): any {
  return (
    <>
      <Navbar
        more
        segmentIndex={2}
        segment={{ 여행: '/match', 식사: '/match/eat', 숙소: '/match/stay' }}
      >
        Match
      </Navbar>
      <ContentBox></ContentBox>
      <Tabbar>3</Tabbar>
    </>
  );
}
