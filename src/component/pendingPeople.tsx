/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import emptyProfile from 'public/empty_profile.png';
import { useState } from 'react';

interface props {
  children: string | undefined;
}

const PendingPerson: any = ({
  children,
  username,
  age,
  stateMessage,
  mannerScore,
  setModal2Display,
  setCandidate,
  userId,
}: {
  children: string | undefined;
  username: string;
  age: number;
  stateMessage: string;
  mannerScore: number;
  setModal2Display: (arg0: boolean) => void;
  setCandidate: (arg0: any) => void;
  userId: string;
}) => {
  const [isImage, setIsImage] = useState(true);
  const BASE_URL: string = process.env.NEXT_BASE_URL
    ? process.env.NEXT_BASE_URL
    : '';
  const CLIENT: string = process.env.NEXT_CLIENT ? process.env.NEXT_CLIENT : '';
  return (
    <div
      className="PendingPerson"
      onClick={() => {
        setModal2Display(true);
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
        {isImage ? (
          <img
            src={userId ? BASE_URL + 'user/image/' + userId : ''}
            onError={(e) => {
              setIsImage(false);
            }}
            width={48}
            height={48}
            alt="image"
          />
        ) : (
          <Image src={emptyProfile} width={48} height={48} alt="image" />
        )}
      </div>
      <div>{username}</div>
      {/* <div>20대 초반</div> */}
      <div>{stateMessage}</div>
      <div>Lv.{mannerScore}</div>
    </div>
  );
};

export default PendingPerson;
