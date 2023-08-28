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
import { useState } from 'react';

export default function Main({ slug }: { slug: string }): any {
  const [modalDisplay, setModalDisplay] = useState(false);
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
        </MatchScrollView>
        <MatchBar
          onClick={() => {
            setModalDisplay(true);
          }}
        />
        <ModalView
          display={modalDisplay}
          setDisplay={setModalDisplay}
          title="동행신청"
          button="보내기"
          onClickProp={() => {}}
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
          ></textarea>
        </ModalView>
      </ContentBox>
    </>
  );
}
