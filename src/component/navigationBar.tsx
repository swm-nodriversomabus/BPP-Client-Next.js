import BackButton from './backButton';
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
  btn: string | undefined;
  btnOnClick: () => void | undefined;
}) => {
  return (
    <>
      <div className={`NavigationBar ${Props.segment ? 'extended' : ''}`}>
        <div>
          {Props.children ? Props.children : <Image src={logo} alt="logo" />}
        </div>
        {Props.back ? <BackButton>{Props.back}</BackButton> : <></>}
        {Props.more ? <MoreButton /> : <></>}
        {Props.btn ? (
          <button className="NavButton" onClick={Props.btnOnClick}>
            {Props.btn}
          </button>
        ) : (
          <></>
        )}
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
