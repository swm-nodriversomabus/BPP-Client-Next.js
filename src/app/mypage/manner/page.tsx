'use client';

import './style.css';
import Navbar from '@/component/navigationBar';
import ContentBox from '@/component/contentBox';
import api from '@/utils/api';

export default function Home(): any {
  return (
    <>
      <Navbar back=" ">매너 레벨이란?</Navbar>
      <ContentBox>
        <div style={{ margin: '20px' }}>
          <h3 style={{ paddingTop: '20px' }}>매너 레벨은 무엇인가요?</h3>
          <div>
            매너 레벨은 여행파티 서비스에서의 활동을 통해 개별 유저에게 부여되는
            레벨로, 매너있는 여행으로 매너 레벨을 높이 유지할 수 있습니다. 여행
            매칭 시 또는 친구창에서 상대방의 매너레벨을 확인할 수 있습니다.
          </div>
          <h3 style={{ paddingTop: '20px' }}>
            매너 레벨을 올리려면 어떻게 해야 하나요?
          </h3>
          <div>
            여행파티에서 매너있는 여행을 하면 매너 레벨을 올릴 수 있습니다.
            함께하는 여행에서 상대방에게 매너있는 모습을 보인다면 점차 명예
            레벨이 올라갑니다. 팀원에게 높은 리뷰를 받으면 명예 레벨이 더 빠르게
            증가합니다. 즐거운 여행을 하며 매너 레벨도 올려보세요.
          </div>
        </div>
      </ContentBox>
    </>
  );
}
