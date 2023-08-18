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
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Main(): any {
  const [type, setType] = useState(0);
  const [title, setTitle] = useState('');
  const [place, setPlace] = useState('');
  const [content, setContent] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [maxMember, setMaxMember] = useState('');
  const router = useRouter();
  const newMatching = () => {
    fetch('https://dev.yeohaengparty.com/api/matching', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        writerId: 1,
        type: 'TravelMate',
        title: title,
        place: place,
        content: content,
        startDate: startDate,
        // startDate: '2023-09-04T12:00:00Z',
        endDate: endDate,
        maxMember: maxMember,
        minusAge: 5,
        plusAge: 5,
        readCount: 16,
        isActive: true,
      }),
    })
      .then((res) => {
        if (res.status == 200) {
          return res.json();
        }
      })
      .then((res) => {
        let matchingID = res.matchingId;
        router.push(`/match/room/${matchingID}`);
      });
  };
  return (
    <>
      <Navbar
        back=" "
        btn="등록"
        btnOnClick={() => {
          newMatching();
        }}
      >
        동행글 작성
      </Navbar>

      <ContentBox>
        <div className="section">모집 형태</div>
        <CustomSelect>
          <CustomOption
            onClick={() => {
              setType(0);
            }}
            selected={type == 0 ? true : false}
          >
            여행
          </CustomOption>
          <CustomOption
            onClick={() => {
              setType(1);
            }}
            selected={type == 1 ? true : false}
          >
            식사
          </CustomOption>
          <CustomOption
            onClick={() => {
              setType(2);
            }}
            selected={type == 2 ? true : false}
          >
            숙소 쉐어
          </CustomOption>
        </CustomSelect>
        <div className="section">제목</div>
        <input
          autoComplete="off"
          className="MatchInputText"
          placeholder="동행 제목을 작성하세요"
        />
        <div className="section">여행지</div>
        <input
          autoComplete="off"
          className="MatchInputText"
          placeholder="도시를 선택하세요"
        />
        <div className="section">여행기간</div>
        <input
          autoComplete="off"
          className="MatchInputText"
          placeholder="시작일을 선택하세요"
        />
        <input
          autoComplete="off"
          className="MatchInputText"
          placeholder="종료일을 선택하세요"
        />
        <div className="section">모집 인원</div>
        <input
          autoComplete="off"
          className="MatchInputText"
          placeholder="선택하세요"
        />
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
