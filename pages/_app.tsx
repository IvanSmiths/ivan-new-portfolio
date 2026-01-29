import type { AppProps } from "next/app";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import Footer from "../components/global/Footer/Footer";
import Navbar from "../components/global/Navbar/Navbar";
import { GoogleAnalytics } from "../utils/marketing/analytics/google-analytics";
import { OverlayProvider } from "../utils/stores/overlay";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider enableSystem={true} attribute="class">
        <QueryClientProvider client={queryClient}>
          <OverlayProvider>
            <Navbar />
            <Component {...pageProps} />
            <Footer />
          </OverlayProvider>
        </QueryClientProvider>
      </ThemeProvider>
      <GoogleAnalytics gaId="G-55MHEPYVDV" />
    </>
  );
}
