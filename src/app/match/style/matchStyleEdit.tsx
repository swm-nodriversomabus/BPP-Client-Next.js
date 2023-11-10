'use client';
import './style.css';
import Navbar from '@/component/navigationBar';
import ContentBox from '@/component/contentBox';
import MatchScrollView from '@/view/matchScrollView';
import Image from 'next/image';
import matchstyle from 'public/matchstyle.svg';
import { useState } from 'react';

const MatchStyleComponent = ({
  title,
  items,
  selected,
  setValue,
}: {
  title: string;
  items: Array<object>;
  selected: number | undefined;
  setValue: (index: number) => void;
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
              onClick={() => {
                setValue(index);
              }}
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

const MatchStyleEdit = (Props: { setValues: any; onDone: any }) => {
  const [alcoholAmount, setAlcoholAmount] = useState(0);
  const [mateAllowedAlcohol, setMateAllowedAlcohol] = useState(0);
  const [taste, setTaste] = useState(0);
  const [allowedMoveTime, setAllowedMoveTime] = useState(0);
  const [preferGender, setPreferGender] = useState(0);
  const [smoke, setSmoke] = useState(0);
  const [preferSmoke, setPreferSmoke] = useState(0);
  const [slang, setSlang] = useState(0);
  return (
    <>
      <Navbar
        btn="완료"
        btnOnClick={() => {
          Props.onDone();
        }}
      ></Navbar>
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
            selected={taste}
            setValue={(value: any) => {
              setTaste(value);
              Props.setValues('taste', value);
            }}
          />
          <MatchStyleComponent
            title="2. 음주 의향"
            items={[
              { icon: '⭕️', desc: '있음' },
              { icon: '❌', desc: '없음' },
              { icon: '🙌', desc: '상관없음' },
            ]}
            selected={mateAllowedAlcohol}
            setValue={(value: any) => {
              setMateAllowedAlcohol(value);
              Props.setValues('mateAllowedAlcohol', value);
            }}
          />
          <MatchStyleComponent
            title="3. 본인의 흡연 여부"
            items={[
              { icon: '⭕️', desc: '흡연자' },
              { icon: '❌', desc: '비흡연자' },
            ]}
            selected={smoke}
            setValue={(value: any) => {
              setSmoke(value);
              Props.setValues('smoke', value);
            }}
          />
          <MatchStyleComponent
            title="4. 메이트의 흡연 여부"
            items={[
              { icon: '🚬', desc: '흡연 선호' },
              { icon: '🚭', desc: '비흡연 선호' },
              { icon: '🙌', desc: '선호 없음' },
            ]}
            selected={preferSmoke}
            setValue={(value: any) => {
              setPreferSmoke(value);
              Props.setValues('preferSmoke', value);
            }}
          />
          <MatchStyleComponent
            title="5. 선호하는 성별"
            items={[
              { icon: '🙆‍♂️', desc: '남성 선호' },
              { icon: '🙆‍♀️', desc: '여성 선호' },
              { icon: '🙌', desc: '선호 없음' },
            ]}
            selected={preferGender}
            setValue={(value: any) => {
              setPreferGender(value);
              Props.setValues('preferGender', value);
            }}
          />
          <MatchStyleComponent
            title="6. 메이트의 비속어 사용"
            items={[
              { icon: '⭕️', desc: '해도 괜찮다' },
              { icon: '❌', desc: '원하지 않음' },
              { icon: '🙌', desc: '상관없음' },
            ]}
            selected={slang}
            setValue={(value: any) => {
              setSlang(value);
              Props.setValues('slang', value);
            }}
          />
          <MatchStyleComponent
            title="7. 선호하는 이동 수단"
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
            selected={allowedMoveTime}
            setValue={(value: any) => {
              setAllowedMoveTime(value);
              Props.setValues('allowedMoveTime', value);
            }}
          />
        </MatchScrollView>
      </ContentBox>
    </>
  );
};

export default MatchStyleEdit;
