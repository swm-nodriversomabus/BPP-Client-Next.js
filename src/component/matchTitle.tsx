interface props {
  children: string | undefined;
  category: string | undefined;
}

const MatchTitle: any = ({ children, category }: props) => {
  return (
    <h1 className="MatchTitle">
      <div>{category}</div>
      {children}
    </h1>
  );
};

export default MatchTitle;
