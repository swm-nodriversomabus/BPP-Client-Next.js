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
import api from '@/utils/api';
import MatchStyleEdit from '../style/matchStyleEdit';

export default function Main(): any {
  const [stylePage, setStylePage] = useState(false);
  const [type, setType] = useState(0);
  const [title, setTitle] = useState('함께 여행해요');
  const [place, setPlace] = useState('파리');
  const [content, setContent] = useState('');
  const [startDate, setStartDate] = useState(
    `${new Date().getFullYear()}-${(101 + new Date().getMonth())
      .toString()
      .substring(1)}-${(100 + new Date().getDate()).toString().substring(1)}T${(
      100 + new Date().getHours()
    )
      .toString()
      .substring(1)}:${(100 + new Date().getMinutes()).toString().substring(1)}`
  );
  const [endDate, setEndDate] = useState(
    `${new Date().getFullYear()}-${(101 + new Date().getMonth())
      .toString()
      .substring(1)}-${(100 + new Date().getDate()).toString().substring(1)}T${(
      100 + new Date().getHours()
    )
      .toString()
      .substring(1)}:${(100 + new Date().getMinutes()).toString().substring(1)}`
  );
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
        type: type == 0 ? 'TravelMate' : type == 1 ? 'Dining' : 'Accommodation',
        title: title ? title : '함께 여행해요',
        place: place ? place : '파리',
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
              'put',
              {
                alcoholAmount: [0, 1, 2, 3, 4][alcoholAmount],
                mateAllowedAlcohol: [1, 0][mateAllowedAlcohol],
                taste: [
                  'Cold',
                  'Hot',
                  'Fatty',
                  'Spicy',
                  'Scent',
                  'Fishy',
                  'Meat',
                ][taste],
                allowedMoveTime: [0, 1, 2, 3, 4, 5, 6, 7][allowedMoveTime],
                allowedPeople: Number(maxMember),
                preferGender: ['Male', 'Female', 'None'][preferGender],
                smoke: [true, false][smoke],
                preferSmoke: ['Smoke', 'Nonsmoke', 'None'][preferSmoke],
                slang: [1, 0][slang],
              },
              [
                null,
                (res: JSON) => {
                  window.location.replace(`/match/room/${matchingId}`);
                  // router.push(`/match/room/${matchingId}`);
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
            setTitle(
              e.target.value.replaceAll(/[\t&|="';]/gi, '').substring(0, 30)
            );
          }}
          onBlur={(e: any) => {
            if (e.target.value.replaceAll(/[\s]/gi, '').length == 0) {
              setTitle('');
            } else {
              setTitle(
                e.target.value.replaceAll(/[\t&|="';]/gi, '').substring(0, 30)
              );
            }
          }}
          autoComplete="off"
          className="MatchInputText"
          placeholder="동행 제목을 작성하세요"
          value={title}
        />
        <div className="newMatchSection">여행지</div>
        <input
          onChange={(e: any) => {
            setPlace(e.target.value.substring(0, 30));
          }}
          autoComplete="off"
          className="MatchInputText"
          placeholder="도시를 선택하세요"
          value={place}
        />
        <div className="newMatchSection">여행기간</div>
        <input
          type="datetime-local"
          onChange={(e: any) => {
            setStartDate(e.target.value);
          }}
          onBlur={() => {
            if (startDate > endDate) {
              setEndDate(startDate);
            }
          }}
          autoComplete="off"
          className="MatchInputText"
          placeholder="시작일을 선택하세요"
          value={startDate}
        />
        <input
          type="datetime-local"
          onChange={(e: any) => {
            setEndDate(e.target.value);
          }}
          onBlur={() => {
            if (startDate > endDate) {
              setStartDate(endDate);
            }
          }}
          autoComplete="off"
          className="MatchInputText"
          placeholder="종료일을 선택하세요"
          value={endDate}
        />
        <div className="newMatchSection">모집 인원</div>
        <input
          onChange={(e: any) => {
            setMaxMember(
              e.target.value.replaceAll(/[^\d]/gi, '').substring(0, 3)
            );
          }}
          onBlur={(e: any) => {
            if (Number(e.target.value.replaceAll(/[^\d]/gi, '')) <= 2) {
              setMaxMember('3');
            } else {
              setMaxMember(
                e.target.value.replaceAll(/[^\d]/gi, '').substring(0, 3)
              );
            }
          }}
          autoComplete="off"
          className="MatchInputText"
          placeholder="입력하세요"
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
            setContent(
              e.target.value.replaceAll(/[\t&|="';]/gi, '').substring(0, 3000)
            );
          }}
          className="MatchText"
          placeholder="매칭에 대한 자세한 이야기를 써보세요"
          value={content}
        ></textarea>
      </ContentBox>
    </>
  );
}
