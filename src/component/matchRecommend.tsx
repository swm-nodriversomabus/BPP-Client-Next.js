import Link from 'next/link';

interface props {}

const MatchRecommend: any = ({}: props) => {
  return (
    <div className="MatchRecommend">
      <div>동행자를 찾고 있어요!</div>
      <div>
        <Link href="/match/room">
          <div>
            <div>🎒 여행</div>
            <div>같이 구경하실 분!</div>
            <div>혼자 유럽 여행중입니다. ㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹ</div>
            <hr />
            <div>파리</div>
            <div>23.08.05~23.08.05</div>
            <div>2/3</div>
          </div>
        </Link>
        <Link href="/match/room">
          <div>
            <div>🎒 여행</div>
            <div>같이 구경하실 분!</div>
            <div>혼자 유럽 여행중입니다. ㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹ</div>
            <hr />
            <div>파리</div>
            <div>23.08.05~23.08.05</div>
            <div>2/3</div>
          </div>
        </Link>
        <Link href="/match/room">
          <div>
            <div>🎒 여행</div>
            <div>같이 구경하실 분!</div>
            <div>
              혼자 유럽 여행중입니다. <br />
              ㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹ
            </div>
            <hr />
            <div>파리</div>
            <div>23.08.05~23.08.05</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MatchRecommend;
