import Link from 'next/link';
import Navbar from '@/component/navigationBar';
import Tabbar from '@/component/tabBar';
import ContentBox from '@/component/contentBox';
import Image from 'next/image';
import mainbanner1 from 'public/mainbanner_1.svg';
import packagebanner1 from 'public/packagebanner_1.svg';
import matebanner1 from 'public/matebanner_1.svg';
import accombanner1 from 'public/accombanner_1.svg';

const FlickView = (Props: { children: Array<JSX.Element> | undefined }) => {
  return <div className="FlickView">{Props.children}</div>;
};

export default function Home(): any {
  return (
    <>
      <Navbar more></Navbar>
      <ContentBox>
        <FlickView>
          <Image src={mainbanner1} alt="banner" />
          <Image src={mainbanner1} alt="banner" />
          <Image src={mainbanner1} alt="banner" />
          <Image src={mainbanner1} alt="banner" />
        </FlickView>
        <div className="SectionTitle">추천 패키지</div>
        <FlickView>
          <Image src={packagebanner1} alt="banner" />
          <Image src={packagebanner1} alt="banner" />
          <Image src={packagebanner1} alt="banner" />
          <Image src={packagebanner1} alt="banner" />
        </FlickView>
        <div className="SectionTitle">추천 메이트</div>
        <FlickView>
          <Image src={matebanner1} alt="banner" />
          <Image src={matebanner1} alt="banner" />
          <Image src={matebanner1} alt="banner" />
          <Image src={matebanner1} alt="banner" />
          <Image src={matebanner1} alt="banner" />
        </FlickView>
        <div className="SectionTitle">추천 숙소</div>
        <FlickView>
          <Image src={accombanner1} alt="banner" />
          <Image src={accombanner1} alt="banner" />
          <Image src={accombanner1} alt="banner" />
          <Image src={accombanner1} alt="banner" />
          <Image src={accombanner1} alt="banner" />
        </FlickView>
      </ContentBox>
      <Tabbar></Tabbar>
    </>
  );
}
