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
      <body style={{ background: '#555' }} className={inter.className}>
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
          {children}
          <div
            style={{
              position: 'absolute',
              bottom: '8px',
              height: '6px',
              width: '140px',
              background: '#000',
              borderRadius: '10px',
              left: '50%',
              marginLeft: '-70px',
            }}
          ></div>
        </div>
      </body>
    </html>
  );
}
