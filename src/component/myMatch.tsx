import Image from 'next/image';
import Link from 'next/link';
import usercheck from 'public/usercheck.svg';

interface props {
  link: string;
  title: string;
  period: string;
  type: string;
  currentUser: number;
  maxUser: number;
}

const MyMatchItem: any = ({
  link,
  title,
  period,
  type,
  currentUser,
  maxUser,
}: props) => {
  return (
    <Link href={link}>
      <div className="matchItem">
        <div>{title}</div>
        <div>{period}</div>
        <div>
          {type == 'TravelMate'
            ? '🎒 여행'
            : type == 'Dining'
            ? '🍱 식사'
            : '🏠 숙박'}
        </div>
        <div>
          <Image src={usercheck} alt="users" />
          <div>{currentUser}</div>
          <div>/</div>
          <div>{maxUser}</div>
        </div>
      </div>
    </Link>
  );
};

const MyMatch: any = ({
  children,
  title,
}: {
  children: string | undefined;
  title: string | undefined;
}) => {
  return (
    <div className="MyMatch">
      <div>{title ? title : '내가 한 요청'}</div>
      <div>{children}</div>
    </div>
  );
};

export default MyMatch;
export { MyMatchItem };
