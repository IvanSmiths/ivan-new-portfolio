import "./globals.css";
import type { Metadata } from "next";
import { lato } from "../utils/fonts";
import React from "react";
import { ThemeProvider } from "next-themes";
import NavbarMobile from "../components/global/Navbar/NavbarMobile/NavbarMobile";
import { GoogleAnalytics } from "../utils/analytics/google-analytics";

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
        className="bg-light text-dark dark:bg-dark dark:text-light"
      >
        <ThemeProvider enableSystem={true} attribute="class">
          <NavbarMobile />
          {children}
        </ThemeProvider>
        <GoogleAnalytics gaId="G-55MHEPYVDV" />
      </body>
    </html>
  );
}
