describe("Navigation", () => {
  it("should navigate to the works page", () => {
    cy.visit("/");
    cy.wait(5000);
    cy.get('nav a[href*="works"]').click();
    cy.url().should("include", "/works");
  });
});
