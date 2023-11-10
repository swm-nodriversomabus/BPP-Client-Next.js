interface props {
  alcoholAmount: number;
  mateAllowedAlcohol: number;
  taste: number;
  allowedMoveTime: number;
  preferGender: number;
  smoke: number;
  preferSmoke: number;
  slang: number;
}

const MatchStyle: any = ({
  alcoholAmount,
  mateAllowedAlcohol,
  taste,
  allowedMoveTime,
  preferGender,
  smoke,
  preferSmoke,
  slang,
}: props) => {
  return (
    <div className="MatchStyle">
      <div>
        <div>
          <div>{['🍻', '❌'][mateAllowedAlcohol]}</div>
          {['함께 술', '술 안함'][mateAllowedAlcohol]}
        </div>
        <div>
          <div>{['❄️', '🔥', '🧈', '🌶️', '🧄', '🦪', '🥩'][taste]}</div>
          {
            [
              '찬 음식',
              '뜨거운 음식',
              '기름진 음식',
              '매운 음식',
              '향신료 강한',
              '비린 음식',
              '육류',
            ][taste]
          }
        </div>
        <div>
          <div>{['🚬', '🚭', '🙌'][preferSmoke]}</div>
          {['함께 흡연', '금연', '상관없음'][preferSmoke]}
        </div>
        <div>
          <div>{['🤬', '❌', '🙌'][slang]}</div>
          {['자유로운 언어', '바른 언어', '상관없음'][slang]}
        </div>
        <div>
          <div>{['🤬', '❌', '🙌'][preferGender]}</div>
          {['자유로운 언어', '바른 언어', '상관없음'][preferGender]}
        </div>
        <div>
          <div>
            {['🚶', '🚙', '🚐', '🚈', '🚕', '🚲', '🗺️', '🙌'][allowedMoveTime]}
          </div>
          {
            [
              '도보',
              '승용차',
              '승합차',
              '대중교통',
              '택시',
              '자전거',
              '기타',
              '선호없음',
            ][allowedMoveTime]
          }
        </div>
      </div>
    </div>
  );
};

export default MatchStyle;
