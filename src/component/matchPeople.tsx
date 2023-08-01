interface props {
  children: string | undefined;
}

const MatchPeople: any = ({ children }: props) => {
  return (
    <div className="MatchPeople">
      <div>확정 동행 인원</div>
      <div>{children}</div>
    </div>
  );
};

export default MatchPeople;
