'use client';
import { RecoilRoot } from 'recoil';
import Main from './main';

export default function Page({ params }: { params: { slug: string } }): any {
  return (
    <RecoilRoot>
      <Main slug={params.slug} />
    </RecoilRoot>
  );
}
