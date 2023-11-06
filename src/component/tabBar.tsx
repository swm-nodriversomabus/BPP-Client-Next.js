import TabItem from './tabItem';

const TabBar: any = (Props: { children: number | undefined }) => {
  let tabNum: number = 1;
  if (Props.children && Props.children >= 1 && Props.children <= 4) {
    tabNum = Props.children;
  }
  return (
    <div className="TabBar">
      <TabItem link="/" highlight={tabNum == 1} img="home">
        Home
      </TabItem>
      <TabItem link="/talk" highlight={tabNum == 2} img="talk">
        Talk
      </TabItem>
      <TabItem link="/match" highlight={tabNum == 3} img="match">
        Match
      </TabItem>
      <TabItem link="/travel" highlight={tabNum == 4} img="travel">
        Travel
      </TabItem>
    </div>
  );
};

export default TabBar;
