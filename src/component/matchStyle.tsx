interface props {
  children: string | undefined;
}

const MatchStyle: any = ({ children }: props) => {
  return (
    <div className="MatchStyle">
      <div>선호하는 여행 스타일</div>
      <div>{children}</div>
    </div>
  );
};

export default MatchStyle;
