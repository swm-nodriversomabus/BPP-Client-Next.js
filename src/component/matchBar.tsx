import Image from 'next/image';
import usercheck from 'public/usercheck.svg';

interface props {
  onClick: () => void;
  status: string;
  maxMember: string;
  currentMember: string;
}

const MatchBar: any = ({
  onClick,
  status,
  maxMember,
  currentMember,
}: props) => {
  if (status == '' || status == 'Owner' || status == 'Approved') {
    return <></>;
  }
  return (
    <div className="MatchBar">
      <div>32명이 연락함</div>
      <div>
        <div>모집 인원</div>
        <div>
          <Image src={usercheck} alt="how many people" />
          <div>{currentMember}</div>/{maxMember}
        </div>
        <button
          onClick={status == 'None' ? onClick : () => {}}
          style={status == 'None' ? {} : { background: '#bbbbbd' }}
        >
          {status == 'Pending'
            ? '신청함'
            : status == 'Declined'
            ? '거절됨'
            : '동행 신청'}
        </button>
      </div>
    </div>
  );
};

export default MatchBar;
