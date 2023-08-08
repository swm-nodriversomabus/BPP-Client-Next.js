import BackButton from './backButton';
import StatusBar from './statusBar';
import MoreButton from './moreButton';
import SegmentControl from './segmentControl';
import Image from 'next/image';
import logo from 'public/logo.svg';

const NavigationBar: any = (Props: {
  children: string | undefined;
  back: string | undefined;
  more: boolean | undefined;
  segment: Object | undefined;
  segmentIndex: number | undefined;
}) => {
  return (
    <>
      <div className={`NavigationBar ${Props.segment ? 'extended' : ''}`}>
        <div>
          {Props.children ? Props.children : <Image src={logo} alt="logo" />}
        </div>
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
