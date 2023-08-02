import Link from 'next/link';

interface props {}

const MyMatch: any = ({}: props) => {
  return (
    <div className="MyMatch">
      <div>내가 한 요청</div>
      <div>
        <Link href="/match/room">
          <div>
            <div>아르헨티나</div>
            <div>23.12.24~24.01.01</div>
            <div>🎒 여행</div>
            <div>2/3</div>
          </div>
        </Link>
        <Link href="/match/room">
          <div>
            <div>아르헨티나</div>
            <div>23.12.24~24.01.01</div>
            <div>🎒 여행</div>
            <div>2/3</div>
          </div>
        </Link>
        <Link href="/match/room">
          <div>
            <div>아르헨티나</div>
            <div>23.12.24~24.01.01</div>
            <div>🎒 여행</div>
            <div>2/3</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MyMatch;
