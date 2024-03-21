import { ThemeMode } from "../../utils/store";

type Theme = ThemeMode;

export const toggleTheme = (theme: Theme): void => {
  cy.get(`nav div img[src="/icons/${theme}.svg"]`).click();
};
