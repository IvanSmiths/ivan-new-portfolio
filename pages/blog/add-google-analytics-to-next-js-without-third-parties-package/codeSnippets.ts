export const gaSource = `\
'use client'
// TODO: Evaluate import 'client only'
import React, { useEffect } from 'react'
import Script from 'next/script'

import type { GAParams } from '../types/google'

declare global {
  interface Window {
    dataLayer?: Object[]
  }
}

let currDataLayerName: string | undefined = undefined

export function GoogleAnalytics(props: GAParams) {
  const { gaId, debugMode, dataLayerName = 'dataLayer', nonce } = props

  if (currDataLayerName === undefined) {
    currDataLayerName = dataLayerName
  }

  useEffect(() => {
    performance.mark('mark_feature_usage', {
      detail: {
        feature: 'next-third-parties-ga',
      },
    })
  }, [])

  return (
    <>
      <Script
        id="_next-ga-init"
        dangerouslySetInnerHTML={{
          __html: \`
          window['\${dataLayerName}'] = window['\${dataLayerName}'] || [];
          function gtag(){window['\${dataLayerName}'].push(arguments);}
          gtag('js', new Date());

          gtag('config', '\${gaId}' \${debugMode ? ",{ 'debug_mode': true }" : ''});\`,
        }}
        nonce={nonce}
      />
      <Script
        id="_next-ga"
        src={\`https://www.googletagmanager.com/gtag/js?id=\${gaId}\`}
        nonce={nonce}
      />
    </>
  )
}

export function sendGAEvent(..._args: Object[]) {
  if (currDataLayerName === undefined) {
    console.warn(\`@next/third-parties: GA has not been initialized\`)
    return
  }

  if (window[currDataLayerName]) {
    window[currDataLayerName].push(arguments)
  } else {
    console.warn(
      \`@next/third-parties: GA dataLayer \${currDataLayerName} does not exist\`
    )
  }
}
`;

export const gaUsage = `\
import Script from "next/script";

type GAParams = {
  gaId: string;
  dataLayerName?: string;
  debugMode?: boolean;
  nonce?: string;
};

let currDataLayerName: string | undefined = undefined;

export function GoogleAnalytics(props: GAParams) {
  const { gaId, debugMode, dataLayerName = "dataLayer", nonce } = props;

  if (currDataLayerName === undefined) {
    currDataLayerName = dataLayerName;
  }

  return (
    <>
      <Script
        id="_next-ga-init"
        dangerouslySetInnerHTML={{
          __html: \`
          window['\${dataLayerName}'] = window['\${dataLayerName}'] || [];
          function gtag(){window['\${dataLayerName}'].push(arguments);}
          gtag('js', new Date());

          gtag('config', '\${gaId}' \${debugMode ? ",{ 'debug_mode': true }" : ""});\`,
        }}
        nonce={nonce}
      />
      <Script
        id="_next-ga"
        src={\`https://www.googletagmanager.com/gtag/js?id=\${gaId}\`}
        nonce={nonce}
      />
    </>
  );
}
`;

export const rootLayout = `\
import "./globals.css";
import { GoogleAnalytics } from "../utils/analytics/google-analytics";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body> {children}
        <GoogleAnalytics gaId="pass-your-GA-id-here-as-a-string" />
      </body>
    </html>
  );
}
`;
