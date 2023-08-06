interface props {
  children: string | undefined;
}

const MatchSegment: any = ({ children }: props) => {
  return (
    <div className="MatchSegment">
      <div className="selected">💜 전체</div>
      <div>🎒 여행</div>
      <div>🏠 숙박</div>
    </div>
  );
};

export default MatchSegment;
