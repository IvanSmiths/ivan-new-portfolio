import { wait } from "../../lib/wait/wait.cy";
import { toggleTheme } from "../../lib/navbar/themeToggle.cy";
import { checkLogoColor } from "../../lib/logo/logo.cy";
import { ThemeColors, ThemeMode } from "../../../utils/store";

describe("Theme", (): void => {
  beforeEach(() => {
    cy.visit("/");
  });
  it(
    "should change color of the logo based on the theme",
    { scrollBehavior: false },
    (): void => {
      wait(5000);
      toggleTheme(ThemeMode.Dark);
      checkLogoColor(ThemeColors.Dark);
      toggleTheme(ThemeMode.Light);
      checkLogoColor(ThemeColors.Light);
    },
  );
});
