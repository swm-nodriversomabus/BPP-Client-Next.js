import exp from 'constants';
import Image from 'next/image';
import Link from 'next/link';
import pin_gray from 'public/pin_gray.svg';
import usercheck from 'public/usercheck.svg';

interface props {
  link: string;
  type: string;
  title: string;
  article: string;
  place: string;
  period: string;
  currentUser: number;
  maxUser: number;
}

const MatchRecommendItem: any = ({
  link,
  type,
  title,
  article,
  place,
  period,
  currentUser,
  maxUser,
}: props) => {
  return (
    <Link href={link}>
      <div>
        <div>{type}</div>
        <div>{title}</div>
        <div>
          {article.split('\\n').map((line, index) => {
            if (index)
              return (
                <>
                  <br />
                  {line}
                </>
              );
            return line;
          })}
        </div>
        <hr />
        <div>
          <Image src={pin_gray} alt="pin" />
          {place}
        </div>
        <div>{period}</div>
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

const MatchRecommend: any = ({
  children,
}: {
  children: string | undefined;
}) => {
  return (
    <div className="MatchRecommend">
      <div>동행자를 찾고 있어요!</div>
      <div>{children}</div>
    </div>
  );
};

export default MatchRecommend;
export { MatchRecommendItem };
