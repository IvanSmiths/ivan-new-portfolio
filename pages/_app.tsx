import type { AppProps } from "next/app";
import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import Footer from "../components/global/Footer/Footer";
import Navbar from "../components/global/Navbar/Navbar";
import NavbarMobile from "../components/global/Navbar/NavbarMobile/NavbarMobile";
import { GoogleAnalytics } from "../utils/marketing/analytics/google-analytics";
import { OverlayProvider } from "../utils/stores/overlay";
import { dm_sans } from "../utils/style/fonts/fonts";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<style jsx global>{`
        html {
          font-family: ${dm_sans.style.fontFamily};
        }
      `}</style>
			<ThemeProvider enableSystem={true} attribute="class">
				<QueryClientProvider client={queryClient}>
					<OverlayProvider>
						<NavbarMobile />
						<Navbar />
						<Component {...pageProps} />
					</OverlayProvider>
				</QueryClientProvider>
			</ThemeProvider>
			<Footer />
			<GoogleAnalytics gaId="G-55MHEPYVDV" />
		</>
	);
}
