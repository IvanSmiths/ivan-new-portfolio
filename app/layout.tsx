import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { lato } from "../utils/fonts";
import React from "react";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ivansmiths.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en" className={`${lato.className}`}>
      <body
        suppressHydrationWarning
        className="text-dark dark:text-light bg-light dark:bg-dark"
      >
        <ThemeProvider enableSystem={true} attribute="class">
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
