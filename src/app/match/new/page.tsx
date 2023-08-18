import './style.css';
import Navbar from '@/component/navigationBar';
import ContentBox from '@/component/contentBox';
import Tabbar from '@/component/tabBar';
import MatchScrollView from '@/view/matchScrollView';
import Link from 'next/link';
import MatchSegment from '@/component/matchSegment';
import SearchBar from '@/component/searchBar';
import MyMatch, { MyMatchItem } from '@/component/myMatch';
import MatchRecommend, { MatchRecommendItem } from '@/component/matchRecommend';
import CustomSelect, { CustomOption } from '@/component/customSelect';
import MatchStyle from '@/component/matchStyle';

export default function Home(): any {
  return (
    <>
      <Navbar back=" ">동행글 작성</Navbar>
      <ContentBox>
        <div className="section">모집 형태</div>
        <CustomSelect>
          <CustomOption>여행</CustomOption>
          <CustomOption>식사</CustomOption>
          <CustomOption>숙소 쉐어</CustomOption>
        </CustomSelect>
        <div className="section">제목</div>
        <input
          className="MatchInputText"
          placeholder="동행 제목을 작성하세요"
        />
        <div className="section">여행지</div>
        <input className="MatchInputText" placeholder="도시를 선택하세요" />
        <div className="section">여행기간</div>
        <input className="MatchInputText" placeholder="시작일을 선택하세요" />
        <input className="MatchInputText" placeholder="종료일을 선택하세요" />
        <div className="section">모집 인원</div>
        <input className="MatchInputText" placeholder="선택하세요" />
        <div className="section">여행 스타일</div>
        <MatchStyle>
          <div>
            <div>🍻</div>가벼운 술
          </div>
          <div>
            <div>🍱</div>함께 식사
          </div>
          <div>
            <div>🚭</div>금연
          </div>
          <div>
            <div>🤬</div>바른 언어
          </div>
          <div>
            <div>♂︎♀︎</div>상관없음
          </div>
          <div>
            <div>🚌</div>대중교통
          </div>
        </MatchStyle>
        <div className="section">세부내용</div>
        <textarea
          className="MatchText"
          placeholder="신청 메시지를 보낸 후, 채팅화면에서 계속 대화를 이어나갈 수 있습니다"
        ></textarea>
      </ContentBox>
    </>
  );
}
