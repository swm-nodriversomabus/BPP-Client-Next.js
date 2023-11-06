import Image from 'next/image';
import profile0 from 'public/profile0.svg';

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
  mannerScore,
}: {
  children: string | undefined;
  username: string;
  age: number;
  mannerScore: number;
}) => {
  return (
    <div className="MatchPerson">
      <div>
        <Image src={profile0} alt="profile" />
      </div>
      <div>{username}</div>
      {/* <div>20대 초반</div> */}
      <div>{age}</div>
      <div>Lv.{mannerScore}</div>
    </div>
  );
};

export default MatchPeople;
export { MatchPerson };
