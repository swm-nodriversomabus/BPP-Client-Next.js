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
      <div>
        <div>{title}</div>
        <div>{period}</div>
        <div>{type}</div>
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

const MyMatch: any = ({ children }: { children: string | undefined }) => {
  return (
    <div className="MyMatch">
      <div>내가 한 요청</div>
      <div>{children}</div>
    </div>
  );
};

export default MyMatch;
export { MyMatchItem };
