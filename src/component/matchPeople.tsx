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

const MatchPerson: any = ({ children }: props) => {
  return (
    <div className="MatchPerson">
      <div></div>
      <div>용용이</div>
      <div>20대 초반</div>
      <div>Lv.1</div>
    </div>
  );
};

export default MatchPeople;
export { MatchPerson };
