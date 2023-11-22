'use client';

import Script from 'next/script';
const GoogleAnalytics: any = () => {
  const GOOGLEANALYTICS = process.env.GOOGLEANALYTICS;
  return (
    <div className="container">
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLEANALYTICS}`}
      />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'GA_MEASUREMENT_ID');
        `}
      </Script>
    </div>
  );
};

export default GoogleAnalytics;
