import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import localFont from 'next/font/local';

const Pretendard = localFont({
  src: '../../public/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-preten',
});

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
    <>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link
        rel="apple-touch-icon"
        href="/apple-icon?<generated>"
        type="image/<generated>"
        sizes="<generated>"
      />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content="#fff" />
      <html className={Pretendard.className} lang="en">
        <body style={{ background: '#fff' }}>
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
      </html>
    </>
  );
}
