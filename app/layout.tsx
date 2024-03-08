import "./globals.css";
import React from "react";
import GoogleAnalytics from "../utils/GoogleAnalytics";
import { GA_TRACKING_ID } from "../utils/gtag";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const setInitialTheme = `
function getUserPreference() {
  const storedTheme = localStorage.getItem('theme');
  try {
    const parsedTheme = JSON.parse(storedTheme);
    return parsedTheme;
  } catch (error) {
  }
  return window.matchMedia('(prefers-color-scheme: light)').matches
            ? 'dark'
            : 'light'
}
  `;
  return (
    <html lang="en">
      <GoogleAnalytics />
      <body suppressHydrationWarning={true}>
        {children}
        <Script
          id="ThemeToggle"
          dangerouslySetInnerHTML={{ __html: setInitialTheme }}
        />
        <Script
          strategy="afterInteractive"
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <Script
          id="GooglenAlytics"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
            `,
          }}
        />
        <Analytics />
      </body>
    </html>
  );
}
