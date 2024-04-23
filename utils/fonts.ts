import { Bebas_Neue, Lato } from "next/font/google";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";

export const lato: NextFontWithVariable = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
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
