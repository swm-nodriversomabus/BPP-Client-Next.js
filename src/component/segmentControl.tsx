import Link from 'next/link';

const SegmentControl: any = ({
  segment,
  children,
}: {
  segment: Object | undefined;
  children: number | undefined;
}) => {
  let ret: React.ReactElement = <></>;
  let i = children ? children : 0;
  if (segment) {
    Object.keys(segment).forEach(
      (value: string, index: number, array: string[]) => {
        ret = (
          <>
            {ret}
            <Link
              className={index == i ? 'highlight' : ''}
              href={Object.values(segment)[index]}
            >
              {value}
            </Link>
          </>
        );
      }
    );
  }
  return <div className="SegmentControl">{ret}</div>;
};

export default SegmentControl;
