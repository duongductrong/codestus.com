/* eslint-disable react/no-danger */
import Script from "next/script"

export interface GoogleAnalyticsHeadProps {
  active?: boolean
}

const GoogleAnalyticsHead = ({ active = false }: GoogleAnalyticsHeadProps) =>
  active ? (
    <>
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-W5HXEXS0SF" />
      <Script id="gtm">{`  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-5GTSSXK');`}</Script>
      <Script id="google-analytics">
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-W5HXEXS0SF');`}
      </Script>
      {/* <!-- UA- Global site tag (gtag.js) - Google Analytics --> */}
      <Script async src="https://www.googletagmanager.com/gtag/js?id=UA-148416370-3" />
      <Script id="gtag">
        {` window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'UA-148416370-3');`}
      </Script>
    </>
  ) : (
    <noscript />
  )

export default GoogleAnalyticsHead
