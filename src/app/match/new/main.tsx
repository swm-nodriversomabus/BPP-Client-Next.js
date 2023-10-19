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
import api, { getUserID } from '@/utils/api';
import MatchStyleEdit from '../style/matchStyleEdit';

export default function Main(): any {
  const [stylePage, setStylePage] = useState(false);
  const [type, setType] = useState(0);
  const [title, setTitle] = useState('함께 여행해요');
  const [place, setPlace] = useState('파리');
  const [content, setContent] = useState('');
  const [startDate, setStartDate] = useState('2023-09-04 12:00');
  const [endDate, setEndDate] = useState('2023-09-04 12:00');
  const [maxMember, setMaxMember] = useState('3');

  const [alcoholAmount, setAlcoholAmount] = useState(0);
  const [mateAllowedAlcohol, setMateAllowedAlcohol] = useState(0);
  const [taste, setTaste] = useState(0);
  const [allowedMoveTime, setAllowedMoveTime] = useState(0);
  const [preferGender, setPreferGender] = useState(0);
  const [smoke, setSmoke] = useState(0);
  const [preferSmoke, setPreferSmoke] = useState(0);
  const [slang, setSlang] = useState(0);

  const getValues = (name: string, value: any) => {
    switch (name) {
      case 'alcoholAmount':
        setAlcoholAmount(value);
        break;
      case 'mateAllowedAlcohol':
        setMateAllowedAlcohol(value);
        break;
      case 'taste':
        setTaste(value);
        break;
      case 'allowedMoveTime':
        setAllowedMoveTime(value);
        break;
      case 'preferGender':
        setPreferGender(value);
        break;
      case 'smoke':
        setSmoke(value);
        break;
      case 'preferSmoke':
        setPreferSmoke(value);
        break;
      case 'slang':
        setSlang(value);
        break;
    }
  };

  const router = useRouter();
  const newMatching = () => {
    api(
      'matching',
      'post',
      {
        type: 'TravelMate',
        title: title,
        place: place,
        content: content,
        startDate: startDate.replace(' ', 'T') + ':00Z',
        endDate: endDate.replace(' ', 'T') + ':00Z',
        maxMember: maxMember ? maxMember : 2,
        minusAge: 5,
        plusAge: 5,
        readCount: 16,
        isActive: true,
      },
      [
        null,
        (json: JSON) => {
          if ('matchingId' in json) {
            const matchingId = json.matchingId;
            api(
              `matching/${matchingId}/preference`,
              'patch',
              {
                alcoholAmount: [1][alcoholAmount],
                mateAllowedAlcohol: [1, 0][mateAllowedAlcohol],
                taste: [
                  '찬 음식',
                  '뜨거운 음식',
                  '기름진 음식',
                  '매운 음식',
                  '향신료 강한',
                  '비린 음식',
                  '육류',
                ][taste],
                allowedMoveTime: [0, 1, 2, 3, 4, 5, 6, 7][allowedMoveTime],
                allowedPeople: maxMember,
                preferGender: ['남성', '여성', '선호 없음'][preferGender],
                smoke: [true, false][smoke],
                preferSmoke: ['흡연 선호', '비흡연 선호', '선호 없음'][
                  preferSmoke
                ],
                slang: [1, 0][slang],
              },
              [
                null,
                (res: JSON) => {
                  router.push(`/match/room/${matchingId}`);
                },
              ]
            );
          }
        },
      ]
    );
  };

  return stylePage ? (
    <MatchStyleEdit
      setValues={getValues}
      onDone={() => {
        setStylePage(false);
      }}
    />
  ) : (
    <>
      <Navbar
        back=" "
        btn="등록"
        btnOnClick={() => {
          console.log(1);
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
          <div
            onClick={() => {
              setStylePage(true);
            }}
            style={{ color: '#8638ea' }}
          >
            편집
          </div>
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
