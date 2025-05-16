import { NextFontWithVariable } from "next/dist/compiled/@next/font";
import { Bebas_Neue, DM_Mono, DM_Sans, Lato } from "next/font/google";

export const lato: NextFontWithVariable = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  display: "swap",
});

export const bebas_neue: NextFontWithVariable = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  preload: true,
  variable: "--font-bebas_neue",
  display: "swap",
});

export const dm_mono: NextFontWithVariable = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  preload: true,
  variable: "--font-dm-mono",
  display: "swap",
});

export const dm_sans: NextFontWithVariable = DM_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "1000"],
  preload: true,
  variable: "--font-dm-sans",
  display: "swap",
});
