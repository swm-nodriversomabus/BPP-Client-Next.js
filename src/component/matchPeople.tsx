import Image from 'next/image';
import emptyProfile from 'public/empty_profile.png';

interface props {
  children: string | undefined;
}

const MatchPeople: any = ({ children }: props) => {
  return (
    <div className="MatchPeople">
      <div>확정 동행 인원</div>
      <div>{children}</div>
    </div>
  );
};

const MatchPerson: any = ({
  children,
  username,
  age,
  stateMessage,
  mannerScore,
}: {
  children: string | undefined;
  username: string;
  age: number;
  stateMessage: string;
  mannerScore: number;
}) => {
  return (
    <div className="MatchPerson">
      <div>
        <Image width={48} height={48} src={emptyProfile} alt="profile" />
      </div>
      <div>{username}</div>
      {/* <div>20대 초반</div> */}
      <div>{stateMessage}</div>
      <div>Lv.{mannerScore}</div>
    </div>
  );
};

export default MatchPeople;
export { MatchPerson };
