'use client';
import './style.css';
import Navbar from '@/component/navigationBar';
import ContentBox from '@/component/contentBox';
import MatchScrollView from '@/view/matchScrollView';
import Image from 'next/image';
import matchstyle from 'public/matchstyle.svg';
import { useEffect, useState } from 'react';
import api from '@/utils/api';
import { BlockLike } from 'typescript';

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

const MatchStyleEdit = () => {
  const [preference, setPreference] = useState(null);
  api('user/preference', 'get', {}, [preference, setPreference]);

  const [alcoholAmount, setAlcoholAmount] = useState(0);
  const [mateAllowedAlcohol, setMateAllowedAlcohol] = useState(0);
  const [taste, setTaste] = useState(0);
  const [allowedMoveTime, setAllowedMoveTime] = useState(0);
  const [preferGender, setPreferGender] = useState(0);
  const [smoke, setSmoke] = useState(0);
  const [preferSmoke, setPreferSmoke] = useState(0);
  const [slang, setSlang] = useState(0);

  useEffect(() => {
    if (!preference) return;
    //   setAlcoholAmount(
    //     ['a', 'b'].indexOf(
    //       (preference as { alcoholAmount: string }).alcoholAmount
    //     )
    //   );
    //   setMateAllowedAlcohol(
    //     ['a', 'b'].indexOf(
    //       (preference as { mateAllowedAlcohol: string }).mateAllowedAlcohol
    //     )
    //   );
    //   setTaste(['a', 'b'].indexOf((preference as { taste: string }).taste));
    //   setAllowedMoveTime(
    //     ['a', 'b'].indexOf(
    //       (preference as { allowedMoveTime: string }).allowedMoveTime
    //     )
    //   );
    //   setPreferGender(
    //     ['a', 'b'].indexOf((preference as { preferGender: string }).preferGender)
    //   );
    //   setSmoke([true, false].indexOf((preference as { smoke: boolean }).smoke));
    //   setPreferSmoke(
    //     ['a', 'b'].indexOf((preference as { preferSmoke: string }).preferSmoke)
    //   );
    //   setSmoke(['a', 'b'].indexOf((preference as { smoke: string }).smoke));
    //   setSlang(['a', 'b'].indexOf((preference as { slang: string }).slang));
    // }, [preference]);

    setAlcoholAmount((preference as { alcoholAmount: number }).alcoholAmount);
    setMateAllowedAlcohol(
      (preference as { mateAllowedAlcohol: number }).mateAllowedAlcohol
    );
    setTaste((preference as { taste: number }).taste);
    setAllowedMoveTime(
      (preference as { allowedMoveTime: number }).allowedMoveTime
    );
    setPreferGender((preference as { preferGender: number }).preferGender);
    setSmoke([true, false].indexOf((preference as { smoke: boolean }).smoke));
    setPreferSmoke((preference as { preferSmoke: number }).preferSmoke);
    setSmoke((preference as { smoke: number }).smoke);
    setSlang((preference as { slang: number }).slang);
  }, [preference]);

  const setValues = (name: string, value: any) => {
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

  return (
    <>
      <Navbar
        btn="완료"
        btnOnClick={() => {
          api(
            'user/preference',
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
              allowedPeople:
                preference && 'allowedPeople' in preference
                  ? (preference as { allowedPeople: number }).allowedPeople
                  : 3,
              preferGender: ['Male', 'Female', 'None'][preferGender],
              smoke: [true, false][smoke],
              preferSmoke: ['Smoke', 'Nonsmoke', 'None'][preferSmoke],
              slang: [1, 0][slang],
            },
            [
              null,
              () => {
                history.back();
              },
            ]
          );
        }}
      >
        {'내 여행 선호도'}
      </Navbar>
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
              setValues('taste', value);
            }}
          />
          <MatchStyleComponent
            title="2. 음주 의향"
            items={[
              { icon: '⭕️', desc: '있음' },
              { icon: '❌', desc: '없음' },
            ]}
            selected={mateAllowedAlcohol}
            setValue={(value: any) => {
              setMateAllowedAlcohol(value);
              setValues('mateAllowedAlcohol', value);
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
              setValues('smoke', value);
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
              setValues('preferSmoke', value);
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
              setValues('preferGender', value);
            }}
          />
          <MatchStyleComponent
            title="6. 메이트의 비속어 사용"
            items={[
              { icon: '⭕️', desc: '해도 괜찮다' },
              { icon: '❌', desc: '원하지 않음' },
            ]}
            selected={slang}
            setValue={(value: any) => {
              setSlang(value);
              setValues('slang', value);
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
              setValues('allowedMoveTime', value);
            }}
          />
        </MatchScrollView>
      </ContentBox>
    </>
  );
};

export default MatchStyleEdit;
