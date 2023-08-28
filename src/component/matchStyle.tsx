interface props {
  children: string | undefined;
}

const MatchStyle: any = ({ children }: props) => {
  return (
    <div className="MatchStyle">
      <div>{children}</div>
    </div>
  );
};

export default MatchStyle;
