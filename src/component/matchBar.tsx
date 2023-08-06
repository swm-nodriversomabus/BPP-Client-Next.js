import Image from 'next/image';
import usercheck from 'public/usercheck.svg';

interface props {}

const MatchBar: any = ({}: props) => {
  return (
    <div className="MatchBar">
      <div>32명이 연락함</div>
      <div>
        <div>모집 인원</div>
        <div>
          <Image src={usercheck} alt="how many people" />
          <div>2</div>/3
        </div>
        <button>동행 신청</button>
      </div>
    </div>
  );
};

export default MatchBar;
