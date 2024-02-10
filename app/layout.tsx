import "../styles/globals.css";
import Navbar from "../components/Global/Navbar";
import React from "react";
import GoogleAnalytics from "../utils/GoogleAnalytics";
import { GA_TRACKING_ID } from "../utils/gtag";

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
      <body>
        <Navbar />
        {children}
        <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <script
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
      </body>
    </html>
  );
}
