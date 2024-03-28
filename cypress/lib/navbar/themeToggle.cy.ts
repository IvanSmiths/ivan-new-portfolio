import { ThemeMode } from "../../../utils/store";

type Theme = ThemeMode;

export const toggleTheme = (theme: Theme): void => {
  cy.get(`nav div ul li span[data-cy=${theme}]`).click();
};
