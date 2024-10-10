import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { bebas_neue, lato } from "../utils/fonts";
import React from "react";
import { ThemeProvider } from "next-themes";
import Footer from "./globalComponents/Footer/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ivansmiths.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${lato.variable} ${bebas_neue.variable}`}
    >
      <body suppressHydrationWarning className="bg-light dark:bg-dark">
        <ThemeProvider attribute="class">{children}</ThemeProvider>
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
