interface props {
  children: string | undefined;
}

const MatchArticle: any = ({ children }: props) => {
  return (
    <div className="MatchArticle">
      <div>{children}</div>
      <button>+ 더보기</button>
    </div>
  );
};

export default MatchArticle;
