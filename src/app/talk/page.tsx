'use client';
import { RecoilRoot } from 'recoil';
import Main from './main';

export default function Home(): any {
  return (
    <RecoilRoot>
      <Main />
    </RecoilRoot>
  );
}
