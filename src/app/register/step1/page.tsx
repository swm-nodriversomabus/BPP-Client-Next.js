'use client';

import '../style.css';
import Navbar from '@/component/navigationBar';
import ContentBox from '@/component/contentBox';
import Image from 'next/image';
import addcheck from 'public/addcheck.svg';
import addcheck_true from 'public/addcheck_true.svg';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function Home(): any {
  const searchParams = useSearchParams();
  // console.log(searchParams.get('provider'));
  const router = useRouter();
  const sendParams = searchParams.toString();
  router.push(`./?${sendParams}`);
  return <></>;
}
