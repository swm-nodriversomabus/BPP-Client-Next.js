import BackButton from "./backButton";
import StatusBar from "./statusBar";
import MoreButton from "./moreButton";
import SegmentControl from "./segmentControl";

const NavigationBar: any = (Props: {
  children: string | undefined;
  back: string | undefined;
  more: boolean | undefined;
  segment: Object | undefined;
  segmentIndex: number | undefined;
}) => {
  return (
    <>
      <StatusBar></StatusBar>
      <div className={`NavigationBar ${Props.segment ? "extended" : ""}`}>
        <h1>{Props.children}</h1>
        {Props.back ? <BackButton>{Props.back}</BackButton> : <></>}
        {Props.more ? <MoreButton /> : <></>}
        {Props.segment ? (
          <SegmentControl segment={Props.segment}>
            {Props.segmentIndex}
          </SegmentControl>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default NavigationBar;
