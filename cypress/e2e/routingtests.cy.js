// For autocompletion
/// <reference types="Cypress" />

describe('Visit tips page', () => {
    it('clicks the button "Tips"', () => {
        cy.visit("localhost:5173");

        cy.contains('Tips').click();

        // Should be on a new URL which
        // includes '/tips'
        cy.url().should('include', '/tips');
    });
});

describe('Visit home page', () => {
    it('clicks the button "Home"', () => {
        cy.visit("localhost:5173/tips");

        cy.contains('Home').click();

        // Should be on a new URL which
        // includes '/'
        cy.url().should('include', '/');
    });
});

describe('Visit unknown page', () => {
    it('visits a non-existent page', () => {
        cy.visit("localhost:5173/null");

        cy.contains("h1", "Oops!").should("exist");
    });
});