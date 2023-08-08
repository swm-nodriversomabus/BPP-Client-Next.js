import StatusBar from '@/component/statusBar';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '여행파티 - 함께 떠나는 설레이는 여행',
  description: '기사없는소마버스',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ background: '#666669' }} className={inter.className}>
        <div
          style={{
            position: 'absolute',
            margin: '10px',
            width: '390px',
            height: '844px',
            background: '#FFF',
            overflow: 'hidden',
            borderRadius: '40px',
            // transform: "scale(0.5)",
            transformOrigin: 'top left',
          }}
        >
          <StatusBar></StatusBar>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              top: '50px',
              margin: '0px',
              width: '390px',
              height: '764px',
              overflow: 'hidden',
            }}
          >
            {children}
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            top: '840px',
            height: '6px',
            width: '140px',
            background: '#000',
            borderRadius: '10px',
            left: '205px',
            marginLeft: '-70px',
          }}
        ></div>
      </body>
    </html>
  );
}
