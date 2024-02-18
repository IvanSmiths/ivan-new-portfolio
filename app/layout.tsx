import "../styles/globals.css";
import React from "react";
import GoogleAnalytics from "../utils/GoogleAnalytics";
import { GA_TRACKING_ID } from "../utils/gtag";
import Script from "next/script";
import Footer from "../components/Global/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const setInitialTheme = `
    function getUserPreference() {
      if(window.localStorage.getItem('theme')) {
        return window.localStorage.getItem('theme')
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light'
    }
    document.body.dataset.theme = getUserPreference();
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
        <Footer />
      </body>
    </html>
  );
}
