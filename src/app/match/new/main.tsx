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
import { useEffect, useState } from 'react';

let userId = 1;
export default function Main(): any {
  const [type, setType] = useState(0);
  const [title, setTitle] = useState('함께 여행해요');
  const [place, setPlace] = useState('파리');
  const [content, setContent] = useState('');
  const [startDate, setStartDate] = useState('2023-09-04 12:00');
  const [endDate, setEndDate] = useState('2023-09-04 12:00');
  const [maxMember, setMaxMember] = useState('3');

  const router = useRouter();
  const newMatching = () => {
    fetch('https://dev.yeohaengparty.com/api/matching', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        writerId: userId,
        type: 'TravelMate',
        title: title ? title : '함께 여행해요',
        place: place ? place : '파리',
        content: content
          ? content
          : '같이 여행하면서 사진찍어주기로 해요! 알려진 명소 말고도 숨겨진 명소 찾아보는 것도 좋아하는데, 함께 찾으시는 거 어때요?ㅎㅎ',
        startDate: startDate
          ? startDate.replace(' ', 'T') + ':00Z'
          : '2023-09-04T12:00:00Z',
        endDate: endDate
          ? endDate.replace(' ', 'T') + ':00Z'
          : '2023-09-04T12:00:00Z',
        maxMember: maxMember ? maxMember : 2,
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
        console.log(res);
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
        <div className="newMatchSection">모집 형태</div>
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
        <div className="newMatchSection">제목</div>
        <input
          onChange={(e: any) => {
            setTitle(e.target.value);
          }}
          autoComplete="off"
          className="MatchInputText"
          placeholder="동행 제목을 작성하세요"
          value={title}
        />
        <div className="newMatchSection">여행지</div>
        <input
          onChange={(e: any) => {
            setPlace(e.target.value);
          }}
          autoComplete="off"
          className="MatchInputText"
          placeholder="도시를 선택하세요"
          value={place}
        />
        <div className="newMatchSection">여행기간</div>
        <input
          onChange={(e: any) => {
            setStartDate(e.target.value);
          }}
          autoComplete="off"
          className="MatchInputText"
          placeholder="시작일을 선택하세요"
          value={startDate}
        />
        <input
          onChange={(e: any) => {
            setEndDate(e.target.value);
          }}
          autoComplete="off"
          className="MatchInputText"
          placeholder="종료일을 선택하세요"
          value={endDate}
        />
        <div className="newMatchSection">모집 인원</div>
        <input
          onChange={(e: any) => {
            setMaxMember(e.target.value);
          }}
          autoComplete="off"
          className="MatchInputText"
          placeholder="선택하세요"
          value={maxMember}
        />
        <div className="newMatchSection">여행 스타일</div>
        <div className="MatchStyleEdit">
          <Link href={'./style'} style={{ color: '#8638ea' }}>
            편집
          </Link>
        </div>
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
        <div className="newMatchSection">세부내용</div>
        <textarea
          onChange={(e: any) => {
            setContent(e.target.value);
          }}
          className="MatchText"
          placeholder="매칭에 대한 자세한 이야기를 써보세요"
          value={content}
        ></textarea>
      </ContentBox>
    </>
  );
}
