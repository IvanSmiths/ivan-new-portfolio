import { NextFontWithVariable } from "next/dist/compiled/@next/font";
import { DM_Mono, DM_Sans } from "next/font/google";

export const dm_mono: NextFontWithVariable = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  preload: true,
  variable: "--font-dm-mono",
  display: "swap",
});

export const dm_sans: NextFontWithVariable = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "1000"],
  preload: true,
  variable: "--font-dm-sans",
  display: "swap",
});
