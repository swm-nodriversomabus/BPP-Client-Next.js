'use client';
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
import ModalView from '@/view/modalView';
import { useState } from 'react';

export default function Home(): any {
  const [modalDisplay, setModalDisplay] = useState(false);
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
          <MatchTitle category="🎒여행">같이 구경하실 분!</MatchTitle>
          <MatchPlan
            place="파리"
            startDate="23년 8월 2일"
            startTime="오전 11시"
            endDate="23년 8월 2일"
            endTime="오후 2시"
          />
          <hr />
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
          <MatchArticle>
            혼자 유럽 여행중입니다. 8월 2일 파리 시내 당일치기하려는데요. 사진
            많이 찍고 싶은데, 혼자는 소매치기가 겁나서요ㅎㅎ
          </MatchArticle>
          <MatchPeople>
            <MatchPerson></MatchPerson>
            <MatchPerson></MatchPerson>
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
