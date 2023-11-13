import Image from 'next/image';
import usercheck from 'public/usercheck.svg';

interface props {
  onClick: () => void;
  status: string;
  maxMember: string;
  currentMember: string;
  pendingMember: number;
}

const MatchBar: any = ({
  onClick,
  status,
  maxMember,
  currentMember,
  pendingMember,
}: props) => {
  if (status == '' || status == 'Owner' || status == 'Approved') {
    return <></>;
  }
  return (
    <div className="MatchBar">
      <div>{`${pendingMember}명이 신청함`}</div>
      <div>
        <div>모집 인원</div>
        <div>
          <Image src={usercheck} alt="how many people" />
          <div>{currentMember}</div>/{maxMember}
        </div>
        <button
          onClick={
            status == 'None' && currentMember < maxMember ? onClick : () => {}
          }
          style={
            status == 'Pending' ||
            status == 'Declined' ||
            currentMember >= maxMember
              ? { background: '#bbbbbd' }
              : {}
          }
        >
          {status == 'Pending'
            ? '신청함'
            : status == 'Declined'
            ? '거절됨'
            : status == 'Owner' || status == 'Approved'
            ? '참여중'
            : currentMember >= maxMember
            ? '인원 꽉참'
            : '동행 신청'}
        </button>
      </div>
    </div>
  );
};

export default MatchBar;
