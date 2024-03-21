import { ThemeColors } from "../../utils/store";

type Theme = ThemeColors;

export const checkLogoColor = (theme: Theme): void => {
  cy.get("svg[id=logo] path").should("have.attr", "fill", theme);
  cy.get("svg[id=logo] rect").should("have.attr", "fill", theme);
};
