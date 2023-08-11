import Image from 'next/image';
import search from 'public/search.svg';
import React from 'react';

interface props {}

const SearchBarFriends: any = ({}: props) => {
  return (
    <div className="SearchBarFriends">
      <Image src={search} alt="search"></Image>
      <input value="" placeholder="검색" />
    </div>
  );
};

export default SearchBarFriends;
