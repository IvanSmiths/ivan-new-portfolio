import { wait } from "../../lib/wait/wait.cy";
import { toggleTheme } from "../../lib/navbar/themeToggle.cy";
import { checkLogoColor } from "../../lib/logo/logo.cy";
import { ThemeColors, ThemeMode } from "../../../utils/store";

describe("Theme", (): void => {
  it(
    "should change color of the logo based on the theme",
    { scrollBehavior: false },
    (): void => {
      cy.visit("/");
      wait(5000);
      toggleTheme(ThemeMode.DARK);
      checkLogoColor(ThemeColors.DARK);
      toggleTheme(ThemeMode.LIGHT);
      checkLogoColor(ThemeColors.LIGHT);
    },
  );
});
