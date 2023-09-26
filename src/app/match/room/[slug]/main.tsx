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
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CompatClient, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import Image from 'next/image';
import newface from 'public/newface.svg';
import Link from 'next/link';
import profile9 from 'public/profile9.svg';
import matchconfirm from 'public/matchconfirm.svg';

let subs: any;

let isNewFace = false;

export default function Main({ slug }: { slug: string }): any {
  // 시연 위해 잠시 웹소켓 연결해둠
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [newFace, setNewFace] = useState<boolean>(false);

  const client = useRef<CompatClient>();
  const connectHandler = () => {
    client.current = Stomp.over(() => {
      const sock = new SockJS('https://dev.yeohaengparty.com/api/ws/chat');
      return sock;
    });
    client.current.connect({}, () => {
      client.current?.send(
        `/pub/subscribe/99999999-9999-9999-9999-999999999999`,
        {}
      );
      subs = client.current?.subscribe(
        `/topic/channel/99999999-9999-9999-9999-999999999999`,
        (message) => {
          const json = JSON.parse(message.body);
          localStorage.setItem('tstep', json.content);
          if (localStorage.getItem('tid') == 1) setNewFace(true);
          console.log(localStorage.getItem('tstep'));
          if (localStorage.getItem('tid') == '1') {
            console.log(localStorage.getItem('tid'));
            setNewFace(true);
            isNewFace = true;
          } else {
            router.push('../../talk/room/99999999-9999-9999-9999-999999999998');
          }
        },
        {}
      );
    });
  };
  const [messageText, setMessageText] = useState('');
  const sendHandler = () => {
    client.current?.send(
      `/pub/chat/99999999-9999-9999-9999-999999999999`,
      {},
      JSON.stringify({
        image: false,
        type: 'TALK',
        roomId: '99999999-9999-9999-9999-999999999999',
        senderId: 1,
        content: messageText,
        readCount: 1,
      })
    );
  };

  if (!isConnected) {
    if (subs) subs.unsubscribe();
    connectHandler();
    setIsConnected(true);
  }

  const router = useRouter();
  const [modalDisplay, setModalDisplay] = useState(false);
  const [modal2Display, setModal2Display] = useState(false);
  const { data }: SWRResponse = useSWR(
    `https://dev.yeohaengparty.com/api/matching/${slug}`,
    (url: RequestInfo | URL) => fetch(url).then((r) => r.json())
  );
  if (!data) {
    return <></>;
  }
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
          <MapPreview />
          <MatchTitle category="🎒여행">{data.title}</MatchTitle>
          <MatchPlan
            place={data.place}
            startDate={`${data.startDate.substr(2, 2)}년 ${Number(
              data.startDate.substr(5, 2)
            )}월 ${Number(data.startDate.substr(8, 2))}일`}
            startTime={`${
              Number(data.startDate.substr(11, 2)) < 12 ? '오전' : '오후'
            } ${(Number(data.startDate.substr(11, 2) - 1) % 12) + 1}시`}
            endDate={`${data.endDate.substr(2, 2)}년 ${Number(
              data.endDate.substr(5, 2)
            )}월 ${Number(data.endDate.substr(8, 2))}일`}
            endTime={`${
              Number(data.endDate.substr(11, 2)) < 12 ? '오전' : '오후'
            } ${(Number(data.endDate.substr(11, 2) - 1) % 12) + 1}시`}
          />
          <hr />

          <div className="MatchStyleHeader">선호하는 여행 스타일</div>
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
          <hr />
          <MatchArticle>{data.content}</MatchArticle>
          <MatchPeople>
            <MatchPerson></MatchPerson>
          </MatchPeople>
          {localStorage.getItem('tid') == '1' ? (
            <div
              className="NewFace"
              style={{
                display: isNewFace ? 'block' : 'none',
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
                새 신청(1)
              </div>
              <div
                className="MatchPerson"
                onClick={() => {
                  setModal2Display(true);
                }}
                style={{ cursor: 'pointer' }}
              >
                <div>
                  <Image src={profile9} alt="profile" width="48" />
                </div>
                <div>명명이</div>
                <div>20대 초반</div>
                <div>Lv.20</div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </MatchScrollView>
        {localStorage.getItem('tid') == '1' ? (
          <></>
        ) : (
          <MatchBar
            onClick={() => {
              setModalDisplay(true);
            }}
          />
        )}
        <ModalView
          display={modalDisplay}
          setDisplay={setModalDisplay}
          title="동행신청"
          button="보내기"
          onClickProp={() => {
            sendHandler();
          }}
        >
          <textarea
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
          ></textarea>
        </ModalView>

        <ModalView
          display={modal2Display}
          setDisplay={setModal2Display}
          title="동행신청"
        >
          <Image src={matchconfirm} style={{ width: '100%' }} />
          <textarea
            style={{
              position: 'absolute',
              width: 'calc(100% - 100px)',
              height: '140px',
              top: '110px',
              left: '50px',
              fontSize: '15px',
              border: 'none',
              resize: 'none',
            }}
          >
            {localStorage.getItem('tstep')}
          </textarea>
        </ModalView>
      </ContentBox>
      <Link href="../../talk/room/99999999-9999-9999-9999-999999999998">
        <Image
          src={newface}
          style={{
            display: newFace ? 'block' : 'none',
            position: 'absolute',
            top: '2px',
            left: '12px',
            width: 'calc(100% - 24px)',
            zIndex: '99999',
            filter: 'drop-shadow(0px 6px 12px rgba(0,0,0,0.25))',
          }}
          alt="noti"
        />
      </Link>
    </>
  );
}
