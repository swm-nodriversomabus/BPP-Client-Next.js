import './style.css';
import Navbar from '../../component/navigationBar';
import ContentBox from '../../component/contentBox';

export default function Home(): any {
  return (
    <>
      <Navbar back="뒤로가기">마이페이지</Navbar>
      <ContentBox></ContentBox>
    </>
  );
}
