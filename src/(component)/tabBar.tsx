import TabItem from "./tabItem";

const TabBar: any = (Props: { children: number | undefined }) => {
  let tabNum: number = 1;
  if (Props.children && Props.children >= 1 && Props.children <= 4) {
    tabNum = Props.children;
  }
  return (
    <div className="TabBar">
      <TabItem link="/" highlight={tabNum == 1}>
        Home
      </TabItem>
      <TabItem link="/talk" highlight={tabNum == 2}>
        Talk
      </TabItem>
      <TabItem link="/match" highlight={tabNum == 3}>
        Match
      </TabItem>
      <TabItem link="/travel" highlight={tabNum == 4}>
        Travel
      </TabItem>
    </div>
  );
};

export default TabBar;
