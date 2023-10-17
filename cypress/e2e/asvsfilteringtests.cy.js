// For autocompletion
/// <reference types="Cypress" />

describe("Filter items", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("should load the ASVS app", () => {
    cy.contains("ASVS for Dummies (ASVS 4.0)");
  });

  it("should filter ASVS items by chapter", () => {
    cy.get("[data-cy=chapter-checkbox]").eq(0).check();
    // Check if all items contain the text: "Architecture, Design and Threat Modeling"
    cy.get("[data-cy=asvs-list-item].true").should(
      "contain.text",
      "Architecture, Design and Threat Modeling"
    );
  });

  it("should filter ASVS items by level", () => {
    cy.get("[data-cy=level-checkbox]").eq(0).check();
    cy.get("[data-cy=asvs-list-item].true").should("have.length.gt", 0);
  });

  it("should show ASVS items when a chapter is clicked", () => {
    cy.get("[data-cy=chapter-checkbox]").first().check();
    cy.get("[data-cy=asvs-list-item].true").should("have.length.gt", 0);
  });

  it("should show all ASVS items when no chapter is clicked", () => {
    cy.get("[data-cy=chapter-checkbox]").first().check();
    cy.get("[data-cy=chapter-checkbox]").first().uncheck();
    cy.get("[data-cy=asvs-list-item].true").should("have.length.gt", 0);
  });
  it("should show ASVS items when search input is empty", () => {
    cy.get("[data-cy=search-input]").clear();
    cy.get("[data-cy=asvs-list-item].true").should("have.length.gt", 0);
  });
  it("should show only show 1 item when searching for 'eu's'", () => {
    cy.get("[data-cy=search-input]").type("eu's");
    cy.get("[data-cy=asvs-list-item].true").should("have.length", 1);
  });
});
