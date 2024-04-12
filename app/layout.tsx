import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { azeret_mono, bebas_neue } from "../utils/fonts";
import React from "react";

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
      <body className="bg-secondary" suppressHydrationWarning={true}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
