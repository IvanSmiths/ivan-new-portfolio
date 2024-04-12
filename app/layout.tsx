import "./globals.css";
import GoogleAnalytics from "../utils/GoogleAnalytics";
import { GA_TRACKING_ID } from "../utils/gtag";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import React from "react";
import { Azeret_Mono, Bebas_Neue } from "next/font/google";
import type { Metadata } from "next";

const azeret_mono = Azeret_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-azeret-mono",
  display: "swap",
});

const bebas_neue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  preload: true,
  variable: "--font-bebas_neue",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ivansmiths.com"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${azeret_mono.variable} ${bebas_neue.variable}`}
    >
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
