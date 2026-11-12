"use client";

import Script from "next/script";
import { flushAnalyticsQueue } from "@/lib/analytics";
import { useConsent } from "./useConsent";

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID?.trim();
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim();

/** Só injeta GA4/Meta Pixel depois de consentimento explícito. */
export function AnalyticsScripts() {
  const consent = useConsent();
  if (consent !== "granted") return null;

  return (
    <>
      {GA4_ID ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`} strategy="afterInteractive" />
          <Script
            id="ga4-init"
            strategy="afterInteractive"
            onReady={flushAnalyticsQueue}
          >{`window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments)};gtag('js',new Date());gtag('config','${GA4_ID}',{send_page_view:true});`}</Script>
        </>
      ) : null}
      {PIXEL_ID ? (
        <Script id="meta-pixel" strategy="afterInteractive" onReady={flushAnalyticsQueue}>
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL_ID}');fbq('track','PageView');`}
        </Script>
      ) : null}
    </>
  );
}
