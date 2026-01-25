import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import Footer from "../components/global/Footer/Footer";
import Navbar from "../components/global/Navbar/Navbar";
import NavbarMobile from "../components/global/Navbar/NavbarMobile/NavbarMobile";
import { GoogleAnalytics } from "../utils/marketing/analytics/google-analytics";
import { OverlayProvider } from "../utils/stores/overlay";
import { dm_sans } from "../utils/style/fonts/fonts";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ivansmiths.com")
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en" className={`${dm_sans.className}`}>
    <body suppressHydrationWarning className="bg-background text-foreground">
    <ThemeProvider enableSystem={true} attribute="class">
      <OverlayProvider>
        <NavbarMobile />
        <Navbar />
        {children}
      </OverlayProvider>
    </ThemeProvider>
    <Footer />
    <GoogleAnalytics gaId="G-55MHEPYVDV" />
    </body>
    </html>
  );
}
