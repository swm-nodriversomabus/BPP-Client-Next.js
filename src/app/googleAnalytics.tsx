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
      {/* <Script
        async
        src={`https://maps.googleapis.com/maps/api/js?key=${'YOUR_API_KEY'}&libraries=places&callback=initMap`}
      /> */}
    </div>
  );
};

export default GoogleAnalytics;
