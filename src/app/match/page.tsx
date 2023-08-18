import './style.css';
import Navbar from '@/component/navigationBar';
import ContentBox from '@/component/contentBox';
import Tabbar from '@/component/tabBar';
import MatchScrollView from '@/view/matchScrollView';
import Link from 'next/link';
import MatchSegment from '@/component/matchSegment';
import SearchBar from '@/component/searchBar';
import MyMatch, { MyMatchItem } from '@/component/myMatch';
import MatchRecommend, { MatchRecommendItem } from '@/component/matchRecommend';
import Image from 'next/image';
import newmatch from 'public/newmatch.svg';

export default function Home(): any {
  return (
    <>
      <Navbar more></Navbar>
      <ContentBox
        styled={{
          height: '100%',
          cursor: 'default',
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <MatchScrollView>
          <MatchSegment />
          <SearchBar />
          <MyMatch>
            <MyMatchItem
              link="match/room"
              title="아르헨티나"
              period="23.12.24~24.01.01"
              type="🎒 여행"
              currentUser={2}
              maxUser={3}
            />
            <MyMatchItem
              link="match/room"
              title="아르헨티나"
              period="23.12.24~24.01.01"
              type="🎒 여행"
              currentUser={2}
              maxUser={3}
            />
            <MyMatchItem
              link="match/room"
              title="아르헨티나"
              period="23.12.24~24.01.01"
              type="🎒 여행"
              currentUser={2}
              maxUser={3}
            />
            <MyMatchItem
              link="match/room"
              title="아르헨티나"
              period="23.12.24~24.01.01"
              type="🎒 여행"
              currentUser={2}
              maxUser={3}
            />
          </MyMatch>
          <MatchRecommend>
            <MatchRecommendItem
              link="/match/room"
              type="🎒 여행"
              article="혼자 유럽 여행중입니다.\n
        8월 2일 파리 시내 당일치기하려는데요. 사진 많이 찍고 싶.."
              place="파리"
              period="23.08.05~23.08.05"
              currentUser={2}
              maxUser={3}
            />
            <MatchRecommendItem
              link="/match/room"
              type="🎒 여행"
              article="혼자 유럽 여행중입니다.\n
        8월 2일 파리 시내 당일치기하려는데요. 사진 많이 찍고 싶.."
              place="파리"
              period="23.08.05~23.08.05"
              currentUser={2}
              maxUser={3}
            />
            <MatchRecommendItem
              link="/match/room"
              type="🎒 여행"
              article="혼자 유럽 여행중입니다.\n
        8월 2일 파리 시내 당일치기하려는데요. 사진 많이 찍고 싶.."
              place="파리"
              period="23.08.05~23.08.05"
              currentUser={2}
              maxUser={3}
            />
            <MatchRecommendItem
              link="/match/room"
              type="🎒 여행"
              article="혼자 유럽 여행중입니다.\n
        8월 2일 파리 시내 당일치기하려는데요. 사진 많이 찍고 싶.."
              place="파리"
              period="23.08.05~23.08.05"
              currentUser={2}
              maxUser={3}
            />
            <MatchRecommendItem
              link="/match/room"
              type="🎒 여행"
              article="혼자 유럽 여행중입니다.\n
        8월 2일 파리 시내 당일치기하려는데요. 사진 많이 찍고 싶.."
              place="파리"
              period="23.08.05~23.08.05"
              currentUser={2}
              maxUser={3}
            />
          </MatchRecommend>
        </MatchScrollView>
      </ContentBox>
      <Link href="match/new">
        <Image
          src={newmatch}
          alt="new match"
          style={{
            cursor: 'pointer',
            position: 'absolute',
            bottom: '76px',
            right: '16px',
          }}
        />
      </Link>
      <Tabbar>3</Tabbar>
    </>
  );
}
