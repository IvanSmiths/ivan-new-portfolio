import type { AppProps } from "next/app";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import gsap from "gsap";
import { useRouter } from "next/router";
import { ThemeProvider } from "next-themes";
import { useRef } from "react";
import { SwitchTransition, Transition } from "react-transition-group";
import Footer from "../components/global/Footer/Footer";
import Navbar from "../components/global/Navbar/Navbar";
import { GoogleAnalytics } from "../utils/marketing/analytics/google-analytics";
import { OverlayProvider } from "../utils/stores/overlay";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const nodeRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Navbar />
      <SwitchTransition mode="out-in">
        <Transition
          key={router.pathname}
          nodeRef={nodeRef}
          timeout={500}
          onEnter={() => {
            if (!nodeRef.current) return;

            gsap.set(nodeRef.current, {
              autoAlpha: 0,
              scale: 0.8,
              xPercent: -100
            });

            gsap
              .timeline()
              .to(nodeRef.current, {
                autoAlpha: 1,
                xPercent: 0,
                duration: 0.25
              })
              .to(nodeRef.current, { scale: 1, duration: 0.25 });
          }}
          onExit={() => {
            if (!nodeRef.current) return;

            gsap
              .timeline()
              .to(nodeRef.current, { scale: 0.8, duration: 0.2 })
              .to(nodeRef.current, {
                xPercent: 100,
                autoAlpha: 0,
                duration: 0.2
              });
          }}
        >
          <div ref={nodeRef}>
            <ThemeProvider enableSystem attribute="class">
              <QueryClientProvider client={queryClient}>
                <OverlayProvider>
                  <Component {...pageProps} />
                </OverlayProvider>
              </QueryClientProvider>
            </ThemeProvider>
          </div>
        </Transition>
      </SwitchTransition>

      <Footer />
      <GoogleAnalytics gaId="G-55MHEPYVDV" />
    </>
  );
}
