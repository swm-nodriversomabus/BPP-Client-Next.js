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
  setModal3Display,
  setCandidate,
  userId,
}: {
  children: string | undefined;
  username: string;
  age: number;
  stateMessage: string;
  mannerScore: number;
  setModal3Display: (arg0: boolean) => void;
  setCandidate: (arg0: any) => void;
  userId: string;
}) => {
  return (
    <div
      className="MatchPerson"
      onClick={() => {
        setModal3Display(true);
        setCandidate({
          username: username,
          age: age,
          mannerScore: mannerScore,
          userId: userId,
          stateMessage: stateMessage,
        });
      }}
    >
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
