import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import localFont from 'next/font/local';
import GoogleAnalytics from './googleAnalytics';

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

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const GOOGLEMAPS = process.env.GOOGLEMAPS;
  return (
    <>
      <Script
        async
        src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLEMAPS}&libraries=places&callback=initMap`}
      />
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link
        rel="apple-touch-icon"
        href="/apple-icon?<generated>"
        type="image/<generated>"
        sizes="<generated>"
      />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content="#fff" />
      <html className={Pretendard.className} lang="en">
        <body>
          <div id="portraitView">{children}</div>
          <GoogleAnalytics />
        </body>
      </html>
    </>
  );
}
