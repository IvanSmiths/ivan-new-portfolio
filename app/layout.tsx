import "./globals.css";
import GoogleAnalytics from "../utils/GoogleAnalytics";
import { GA_TRACKING_ID } from "../utils/gtag";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import React from "react";
import { Azeret_Mono } from "next/font/google";

const azeret_mono = Azeret_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-azeret-mono",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${azeret_mono.variable}`}>
      <GoogleAnalytics />
      <body className="bg-secondary" suppressHydrationWarning={true}>
        {children}
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
