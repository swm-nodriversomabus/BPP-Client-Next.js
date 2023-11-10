import './style.css';
import Navbar from '@/component/navigationBar';
import ContentBox from '@/component/contentBox';
import MapPreview from '@/component/mapPreview';
import MatchTitle from '@/component/matchTitle';
import MatchPlan from '@/component/matchPlan';
import MatchStyle from '@/component/matchStyle';
import MatchArticle from '@/component/matchArticle';
import MatchPeople, { MatchPerson } from '@/component/matchPeople';
import MatchScrollView from '@/view/matchScrollView';
import MatchBar from '@/component/matchBar';
import useSWR, { SWRResponse } from 'swr';
import ModalView from '@/view/modalView';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CompatClient, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import Image from 'next/image';
import newface from 'public/newface.svg';
import Link from 'next/link';
import emptyProfile from 'public/empty_profile.png';
import matchconfirm from 'public/matchconfirm.svg';
import api from '@/utils/api';
import MatchStyleEdit from '../../style/matchStyleEdit';

let subs: any;

let isNewFace = false;

// [
//   {
//     "matchingId": 1,
//     "writerId": 12,
//     "type": "TravelMate",
//     "title": "함께 여행해요",
//     "place": "파리",
//     "content": "",
//     "startDate": [2023, 9, 4, 12, 0],
//     "endDate": [2023, 9, 4, 12, 0],
//     "maxMember": 3,
//     "minusAge": 5,
//     "plusAge": 5,
//     "readCount": 16,
//     "createdAt": [2023, 10, 10, 2, 45, 31, 403999000],
//     "updatedAt": [2023, 10, 10, 2, 45, 31, 403999000],
//     "isActive": true
//   },
// ],

export default function Main({ slug }: { slug: string }): any {
  const [matchInfo, setMatchInfo] = useState<JSON | null>(null);
  api(`matching/${slug}`, 'get', {}, [matchInfo, setMatchInfo]);

  const [myStatus, setMyStatus] = useState<JSON | null>(null);
  api(`matching/${slug}/status`, 'get', {}, [myStatus, setMyStatus]);

  const [approved, setApproved] = useState<JSON | null>(null);
  api(`matching/${slug}/approved`, 'get', {}, [approved, setApproved]);

  const [pending, setPending] = useState<JSON | null>(null);
  api(`matching/${slug}/pending`, 'get', {}, [pending, setPending]);

  const [preference, setPreference] = useState<JSON | null>(null);
  api(`matching/${slug}/preference`, 'get', {}, [preference, setPreference]);

  const [alcoholAmount, setAlcoholAmount] = useState(0);
  const [mateAllowedAlcohol, setMateAllowedAlcohol] = useState(0);
  const [taste, setTaste] = useState(0);
  const [allowedMoveTime, setAllowedMoveTime] = useState(0);
  const [preferGender, setPreferGender] = useState(0);
  const [smoke, setSmoke] = useState(0);
  const [preferSmoke, setPreferSmoke] = useState(0);
  const [slang, setSlang] = useState(0);

  const [messageText, setMessageText] = useState('');
  const [modalDisplay, setModalDisplay] = useState(false);
  const [modal2Display, setModal2Display] = useState(false);

  const [candidate, setCandidate] = useState({
    username: '',
    age: 0,
    mannerScore: 0,
    userId: 0,
  });

  const router = useRouter();

  useEffect(() => {
    if (!preference) return;

    setAlcoholAmount(
      'alcoholAmount' in preference
        ? (preference as { alcoholAmount: number }).alcoholAmount
        : 0
    );
    setMateAllowedAlcohol(
      [1, 0, 2].indexOf(
        'mateAllowedAlcohol' in preference
          ? (preference as { mateAllowedAlcohol: number }).mateAllowedAlcohol
          : 1
      )
    );
    setTaste(
      ['Cold', 'Hot', 'Fatty', 'Spicy', 'Scent', 'Fishy', 'Meat'].indexOf(
        'taste' in preference ? (preference as { taste: string }).taste : 'Cold'
      )
    );
    setAllowedMoveTime(
      Math.min(
        'allowedMoveTime' in preference
          ? (preference as { allowedMoveTime: number }).allowedMoveTime
          : 0,
        7
      )
    );
    setPreferGender(
      ['Male', 'Female', 'None'].indexOf(
        'preferGender' in preference
          ? (preference as { preferGender: string }).preferGender
          : 'Male'
      )
    );
    setSmoke(
      [true, false].indexOf(
        'smoke' in preference ? (preference as { smoke: boolean }).smoke : true
      )
    );
    setPreferSmoke(
      ['Smoke', 'Nonsmoke', 'None'].indexOf(
        'preferSmoke' in preference
          ? (preference as { preferSmoke: string }).preferSmoke
          : 'Smoke'
      )
    );
    setSlang(
      [1, 0, 2].indexOf(
        'slang' in preference ? (preference as { slang: number }).slang : 1
      )
    );
  }, [preference]);

  return (
    <>
      <Navbar back=" ">&nbsp;</Navbar>
      <ContentBox
        styled={{
          height: '100%',
          cursor: 'default',
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <MatchScrollView>
          {/* <MapPreview /> */}
          <MatchTitle
            category={
              matchInfo && 'type' in matchInfo
                ? matchInfo.type == 'TravelMate'
                  ? '🎒여행'
                  : matchInfo.type == 'Dining'
                  ? '🍱식사'
                  : '🏠숙박'
                : ''
            }
          >
            {matchInfo && 'title' in matchInfo
              ? (matchInfo as { title: string }).title
              : ''}
          </MatchTitle>
          <MatchPlan
            place={
              matchInfo && 'place' in matchInfo
                ? (matchInfo as { place: string }).place
                : ' '
            }
            startDate={
              matchInfo && 'startDate' in matchInfo
                ? (matchInfo as { startDate: number[] }).startDate[0] +
                  '년 ' +
                  (matchInfo as { startDate: number[] }).startDate[1] +
                  '월 ' +
                  (matchInfo as { startDate: number[] }).startDate[2] +
                  '일'
                : '0000월 00월 00일'
            }
            startTime={
              matchInfo && 'startDate' in matchInfo
                ? (matchInfo as { startDate: number[] }).startDate[3] + '시'
                : '00시'
            }
            endDate={
              matchInfo && 'endDate' in matchInfo
                ? (matchInfo as { endDate: number[] }).endDate[0] +
                  '년 ' +
                  (matchInfo as { endDate: number[] }).endDate[1] +
                  '월 ' +
                  (matchInfo as { endDate: number[] }).endDate[2] +
                  '일'
                : '0000월 00월 00일'
            }
            endTime={
              matchInfo && 'endDate' in matchInfo
                ? (matchInfo as { endDate: number[] }).endDate[3] + '시'
                : '00시'
            }
          />
          <hr />

          <div className="MatchStyleHeader">선호하는 여행 스타일</div>
          <MatchStyle
            alcoholAmount={
              preference &&
              'alcoholAmount' in preference &&
              (preference as { alcoholAmount: number })
            }
            mateAllowedAlcohol={mateAllowedAlcohol}
            taste={taste}
            allowedMoveTime={allowedMoveTime}
            preferGender={preferGender}
            smoke={smoke}
            preferSmoke={preferSmoke}
            slang={slang}
          />
          <hr />
          <MatchArticle>
            {matchInfo && 'content' in matchInfo
              ? (matchInfo as { content: string }).content
              : ''}
          </MatchArticle>
          {approved &&
          'map' in approved &&
          'length' in approved &&
          approved.length ? (
            <MatchPeople>
              {(approved as { map: Function }).map(
                (item: {
                  username: string;
                  age: number;
                  stateMessage: string;
                  mannerScore: number;
                }) => {
                  return (
                    <>
                      <MatchPerson
                        username={item.username}
                        age={item.age}
                        stateMessage={item.stateMessage}
                        mannerScore={item.mannerScore}
                      ></MatchPerson>
                    </>
                  );
                }
              )}
            </MatchPeople>
          ) : (
            <></>
          )}

          {myStatus &&
          'text' in myStatus &&
          ((myStatus as { text: string }).text == 'Owner' ||
            (myStatus as { text: string }).text == 'Approved') &&
          pending &&
          'map' in pending &&
          'length' in pending &&
          pending.length ? (
            <div
              className="NewFace"
              style={{
                display: 'block',
                marginTop: '20px',
                marginLeft: '20px',
                marginRight: '20px',
              }}
            >
              <div
                style={{
                  fontWeight: 'bold',
                  lineHeight: '50px',
                  fontSize: '14px',
                }}
              >
                {`새 신청(${pending.length})`}
              </div>
              {(pending as { map: Function }).map(
                (
                  item: {
                    username: string;
                    age: number;
                    mannerScore: number;
                  },
                  index: number
                ) => {
                  return (
                    <>
                      {' '}
                      <div
                        className="MatchPerson"
                        onClick={() => {
                          if (
                            myStatus &&
                            'text' in myStatus &&
                            (myStatus as { text: string }).text == 'Owner'
                          ) {
                            setModal2Display(true);
                            const copied: any = pending;
                            setCandidate(copied[index]);
                          }
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        <div>
                          <Image src={emptyProfile} alt="profile" width="48" />
                        </div>
                        <div>{item.username}</div>
                        <div>{item.age}</div>
                        <div>Lv.{item.mannerScore}</div>
                      </div>
                    </>
                  );
                }
              )}
            </div>
          ) : (
            <></>
          )}
        </MatchScrollView>

        <MatchBar
          onClick={() => {
            setModalDisplay(true);
          }}
          status={myStatus && 'text' in myStatus ? myStatus.text : ''}
          maxMember={
            matchInfo && 'maxMember' in matchInfo ? matchInfo.maxMember : ''
          }
          currentMember={
            matchInfo && 'currentMember' in matchInfo
              ? matchInfo.currentMember
              : ''
          }
          pendingMember={
            pending && 'length' in pending
              ? (pending as { length: number }).length
              : 0
          }
        />
        <ModalView
          display={modalDisplay}
          setDisplay={setModalDisplay}
          title="동행신청"
          button="보내기"
          onClickProp={() => {
            api(
              'matching/application',
              'post',
              {
                matchingId: Number(slug),
                state: 'Pending',
                isActive: true,
              },
              [
                null,
                (json: JSON) => {
                  setMatchInfo(null);
                  setMyStatus(null);
                  setApproved(null);
                  setPending(null);
                  setModalDisplay(false);
                },
              ]
            );
          }}
        >
          <div
            style={{
              height: '70px',
              lineHeight: '70px',
              paddingBottom: '20px',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '16px',
              color: '#bbb',
            }}
          >
            함께 여행하기로 신청합니다
          </div>
          {/* <textarea
            placeholder="신청 메시지를 보낸후, 채팅화면에서 계속 대화를 이어나갈 수 있습니다"
            style={{
              marginLeft: '24px',
              width: 'calc(100% - 48px)',
              border: 'solid 1px #eeeef0',
              borderRadius: '4px',
              height: '173px',
              fontSize: '15px',
              marginTop: '12px',
              marginBottom: '12px',
              resize: 'none',
              lineHeight: '22.5px',
              padding: '20px',
              boxSizing: 'border-box',
            }}
            onChange={(e) => {
              setMessageText(e.currentTarget.value);
            }}
          ></textarea> */}
        </ModalView>

        <ModalView
          display={modal2Display}
          setDisplay={setModal2Display}
          title="동행신청"
        >
          <div
            className="MatchPerson"
            style={{
              marginLeft: '20px',
              width: 'calc(100% - 80px)',
            }}
          >
            <div>
              <Image src={emptyProfile} alt="profile" width="48" />
            </div>
            <div>{candidate.username}</div>
            <div>{candidate.age}</div>
            <div>Lv.{candidate.mannerScore}</div>
          </div>
          <div
            style={{
              marginTop: '10px',
              marginBottom: '10px',
              position: 'relative',
              width: '100%',
              height: '50px',
            }}
          >
            <button
              onClick={() => {
                api(
                  'matching/application',
                  'put',
                  {
                    userId: candidate.userId,
                    matchingId: Number(slug),
                    state: 'Declined',
                    isActive: true,
                  },
                  [
                    null,
                    () => {
                      setMatchInfo(null);
                      setMyStatus(null);
                      setApproved(null);
                      setPending(null);
                      setModal2Display(false);
                    },
                  ]
                );
              }}
              style={{
                display: 'block',
                position: 'absolute',
                float: 'left',
                boxSizing: 'border-box',
                cursor: 'pointer',
                height: '50px',
                fontSize: '16px',
                fontWeight: 'bold',
                border: 'solid 1px #ddd',
                borderRadius: '8px',
                width: 'calc(50% - 44px)',
                marginLeft: '36px',
                background: '#fff',
              }}
            >
              거절하기
            </button>
            <button
              onClick={() => {
                api(
                  'matching/application',
                  'put',
                  {
                    userId: candidate.userId,
                    matchingId: Number(slug),
                    state: 'Approved',
                    isActive: true,
                  },
                  [
                    null,
                    () => {
                      setMatchInfo(null);
                      setMyStatus(null);
                      setApproved(null);
                      setPending(null);
                      setModal2Display(false);
                    },
                  ]
                );
              }}
              style={{
                right: '0px',
                display: 'block',
                position: 'absolute',
                float: 'right',
                boxSizing: 'border-box',
                cursor: 'pointer',
                height: '50px',
                fontSize: '16px',
                fontWeight: 'bold',
                border: 'none',
                borderRadius: '8px',
                width: 'calc(50% - 44px)',
                marginRight: '36px',
                background: '#8638ea',
                color: '#fff',
              }}
            >
              수락하기
            </button>
          </div>
        </ModalView>
      </ContentBox>

      {/* <Link href="../../talk/room/99999999-9999-9999-9999-999999999998">
        <Image
          src={newface}
          style={{
            display: false ? 'block' : 'none',
            position: 'absolute',
            top: '2px',
            left: '12px',
            width: 'calc(100% - 24px)',
            zIndex: '99999',
            filter: 'drop-shadow(0px 6px 12px rgba(0,0,0,0.25))',
          }}
          alt="noti"
        />
      </Link> */}
    </>
  );
}
