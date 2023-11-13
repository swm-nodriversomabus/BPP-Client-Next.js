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
          <div>{['🍻', '❌', '🙌'][mateAllowedAlcohol]}</div>
          {['함께 술', '술 안함', '술 가능'][mateAllowedAlcohol]}
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
          {['함께 흡연', '금연', '흡연가능'][preferSmoke]}
        </div>
        <div>
          <div>{['🤬', '❌', '🙌'][slang]}</div>
          {['욕설 허용', '욕설 금지', '자유 언어'][slang]}
        </div>
        <div>
          <div>{['🙆‍♂️', '🙆‍♀️', '🙌'][preferGender]}</div>
          {['남자만', '여자만', '모든 성별'][preferGender]}
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
              '자유 이동',
            ][allowedMoveTime]
          }
        </div>
      </div>
    </div>
  );
};

export default MatchStyle;
