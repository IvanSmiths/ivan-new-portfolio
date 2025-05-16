import "./globals.css";
import type { Metadata } from "next";
import { dm_sans } from "../utils/fonts";
import { ThemeProvider } from "next-themes";
import NavbarMobile from "../components/global/Navbar/NavbarMobile/NavbarMobile";
import { GoogleAnalytics } from "../utils/analytics/google-analytics";
import { ReactNode } from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ivansmiths.com"),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en" className={`${dm_sans.className}`}>
      <body suppressHydrationWarning className="bg-background text-foreground">
        <ThemeProvider enableSystem={true} attribute="class">
          <NavbarMobile />
          {children}
        </ThemeProvider>
        <GoogleAnalytics gaId="G-55MHEPYVDV" />
      </body>
    </html>
  );
}
