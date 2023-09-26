'use client';
import './style.css';
import Navbar from '@/component/navigationBar';
import ContentBox from '@/component/contentBox';
import MatchScrollView from '@/view/matchScrollView';
import Image from 'next/image';
import matchstyle from 'public/matchstyle.svg';

const MatchStyleComponent = ({
  title,
  items,
  selected,
}: {
  title: string;
  items: Array<object>;
  selected: number | undefined;
}) => {
  if (typeof selected === 'undefined') {
    selected = 0;
  }
  return (
    <>
      <div className="MatchStyleLabel">{title}</div>
      <div className="MatchStyleSection">
        {items?.map((item: any, index: number) => {
          return (
            <div
              key={index}
              className={`MatchStyleItem${
                index === selected ? ' selected' : ''
              }`}
            >
              <div>{item.icon}</div>
              {item.desc}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default function Home(): any {
  return (
    <>
      <Navbar back=" "></Navbar>
      <ContentBox>
        <MatchScrollView>
          <MatchStyleComponent
            title="1. 안먹는 음식"
            items={[
              { icon: '❄️', desc: '찬 음식' },
              { icon: '🔥', desc: '뜨거운 음식' },
              { icon: '🧈', desc: '기름진 음식' },
              { icon: '🌶️', desc: '매운 음식' },
              { icon: '🧄', desc: '향신료 강한' },
              { icon: '🦪', desc: '비린 음식' },
              { icon: '🥩', desc: '육류' },
            ]}
            selected={0}
          />
          <MatchStyleComponent
            title="2. 음주 의향"
            items={[
              { icon: '⭕️', desc: '있음' },
              { icon: '❌', desc: '없음' },
            ]}
            selected={0}
          />
          <MatchStyleComponent
            title="3. 본인의 흡연 여부"
            items={[
              { icon: '⭕️', desc: '흡연자' },
              { icon: '❌', desc: '비흡연자' },
            ]}
            selected={0}
          />
          <MatchStyleComponent
            title="4. 메이트의 흡연 여부"
            items={[
              { icon: '🚬', desc: '흡연 선호' },
              { icon: '🚭', desc: '비흡연 선호' },
              { icon: '🙌', desc: '선호 없음' },
            ]}
            selected={0}
          />
          <MatchStyleComponent
            title="5. 선호하는 성별"
            items={[
              { icon: '🙆‍♂️', desc: '남성 선호' },
              { icon: '🙆‍♀️', desc: '여성 선호' },
              { icon: '🙌', desc: '선호 없음' },
            ]}
            selected={0}
          />
          <MatchStyleComponent
            title="6. 선호하는 나이차"
            items={[
              { icon: '🔻', desc: 'x살 아래' },
              { icon: '🔺', desc: 'x살 위' },
              { icon: '🙌', desc: '선호 없음' },
            ]}
            selected={0}
          />
          <MatchStyleComponent
            title="7. 본인의 비속어 사용"
            items={[
              { icon: '⭕️', desc: '사용함' },
              { icon: '❌', desc: '하지않음' },
            ]}
            selected={0}
          />
          <MatchStyleComponent
            title="8. 메이트의 비속어 사용"
            items={[
              { icon: '⭕️', desc: '해도 괜찮다' },
              { icon: '❌', desc: '원하지 않음' },
            ]}
            selected={0}
          />
          <MatchStyleComponent
            title="9. 선호하는 이동 수단"
            items={[
              { icon: '🚶', desc: '도보' },
              { icon: '🚙', desc: '승용차' },
              { icon: '🚐', desc: '승합차' },
              { icon: '🚈', desc: '대중교통' },
              { icon: '🚕', desc: '택시' },
              { icon: '🚲', desc: '자전거' },
              { icon: '🗺️', desc: '기타' },
              { icon: '🙌', desc: '선호없음' },
            ]}
            selected={0}
          />
        </MatchScrollView>
      </ContentBox>
    </>
  );
}
