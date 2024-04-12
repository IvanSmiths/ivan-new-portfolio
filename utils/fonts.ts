import { Azeret_Mono, Bebas_Neue } from "next/font/google";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";

export const azeret_mono: NextFontWithVariable = Azeret_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-azeret-mono",
  display: "swap",
});

export const bebas_neue: NextFontWithVariable = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  preload: true,
  variable: "--font-bebas_neue",
  display: "swap",
});
