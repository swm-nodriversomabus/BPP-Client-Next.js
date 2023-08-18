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

export default function Main({ slug }: { slug: string }): any {
  const { data }: SWRResponse = useSWR(
    `https://dev.yeohaengparty.com/api/matching/${slug}`,
    (url: RequestInfo | URL) => fetch(url).then((r) => r.json())
  );
  console.log(data.content);
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
            startDate="23년 8월 2일"
            startTime="오전 11시"
            endDate="23년 8월 2일"
            endTime="오후 2시"
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
            <MatchPerson></MatchPerson>
            <MatchPerson></MatchPerson>
          </MatchPeople>
        </MatchScrollView>
        <MatchBar></MatchBar>
      </ContentBox>
    </>
  );
}
