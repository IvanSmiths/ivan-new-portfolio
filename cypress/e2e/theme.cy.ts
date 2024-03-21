import { wait } from "../helpers/wait.cy";
import { toggleTheme } from "../helpers/themeToggle.cy";
import { checkLogoColor } from "../helpers/logo.cy";
import { ThemeColors, ThemeMode } from "../../utils/store";

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
