import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { bebas_neue, lato } from "../utils/fonts";
import React from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ivansmiths.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${lato.variable} ${bebas_neue.variable}`}>
      <body className="bg-secondary" suppressHydrationWarning={true}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
