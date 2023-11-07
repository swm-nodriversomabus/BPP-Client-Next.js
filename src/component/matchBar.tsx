import Image from 'next/image';
import usercheck from 'public/usercheck.svg';

interface props {
  onClick: () => void;
  maxMember: string;
  currentMember: string;
}

const MatchBar: any = ({ onClick, maxMember, currentMember }: props) => {
  return (
    <div className="MatchBar">
      <div>32명이 연락함</div>
      <div>
        <div>모집 인원</div>
        <div>
          <Image src={usercheck} alt="how many people" />
          <div>{currentMember}</div>/{maxMember}
        </div>
        <button onClick={onClick}>동행 신청</button>
      </div>
    </div>
  );
};

export default MatchBar;
