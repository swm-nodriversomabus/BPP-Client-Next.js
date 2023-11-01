import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';

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
      <body style={{ background: '#fff' }} className={inter.className}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
        >
          {children}
        </div>
      </body>
      <Script
        strategy="beforeInteractive"
        src="https://unpkg.com/@ungap/global-this@0.4.4/min.js"
      ></Script>
    </html>
  );
}
