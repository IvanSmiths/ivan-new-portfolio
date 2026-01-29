import type { AppProps } from "next/app";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type NextRouter, useRouter } from "next/router";
import { ThemeProvider } from "next-themes";
import { SwitchTransition, Transition } from "react-transition-group";
import Footer from "../components/global/Footer/Footer";
import Navbar from "../components/global/Navbar/Navbar";
import { useRouteTransition } from "../utils/hooks/animations/useRouteTransition";
import { GoogleAnalytics } from "../utils/marketing/analytics/google-analytics";
import { OverlayProvider } from "../utils/stores/overlay";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const router: NextRouter = useRouter();

  const { nodeRef, containerRef, handleEnter, handleExit } =
    useRouteTransition();

  return (
    <div ref={containerRef}>
      <Navbar />
      <SwitchTransition mode="out-in">
        <Transition
          key={router.pathname}
          nodeRef={nodeRef}
          timeout={600}
          onEnter={handleEnter}
          onExit={handleExit}
        >
          <div ref={nodeRef}>
            <ThemeProvider enableSystem attribute="class">
              <QueryClientProvider client={queryClient}>
                <OverlayProvider>
                  <Component {...pageProps} />
                  <Footer />
                </OverlayProvider>
              </QueryClientProvider>
            </ThemeProvider>
          </div>
        </Transition>
      </SwitchTransition>
      <GoogleAnalytics gaId="G-55MHEPYVDV" />
    </div>
  );
}
