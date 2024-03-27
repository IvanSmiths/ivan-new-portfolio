import { ThemeMode } from "../../utils/store";

type Theme = ThemeMode;

export const toggleTheme = (theme: Theme): void => {
  cy.contains("nav div span", `-${theme} mode-`).click();
};
