// For autocompletion
/// <reference types="Cypress" />

describe('Filter items', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('should load the ASVS app', () => {
    cy.contains('ASVS for Dummies (ASVS 4.0)');
  });

  it('should filter ASVS items by chapter', () => {
    cy.get('[data-cy=chapter-checkbox]').eq(0).check();
    // Check if all items contain the text: "Architecture, Design and Threat Modeling"
    cy.get('[data-cy=asvs-list-item].true').should(
      'contain.text',
      'Architecture, Design and Threat Modeling'
    );
  });

  it('should filter ASVS items by level', () => {
    cy.get('[data-cy=level-checkbox]').eq(0).check();
    cy.get('[data-cy=asvs-list-item].true').should('have.length.gt', 0);
  });

  it('should show ASVS items when a chapter is clicked', () => {
    cy.get('[data-cy=chapter-checkbox]').first().check();
    cy.get('[data-cy=asvs-list-item].true').should('have.length.gt', 0);
  });

  it('should show all ASVS items when no chapter is clicked', () => {
    cy.get('[data-cy=chapter-checkbox]').first().check();
    cy.get('[data-cy=chapter-checkbox]').first().uncheck();
    cy.get('[data-cy=asvs-list-item].true').should('have.length.gt', 0);
  });

  //Search bar tests
  it('should show ASVS items when search input is empty', () => {
    cy.get('[data-cy=search-input]').clear();
    cy.get('[data-cy=asvs-list-item].true').should('have.length.gt', 0);
  });

  it('should set the focus to the search bar when / is pressed', () => {
    // Stupid workaround because I couldn't trigger a keypress on either cy.document or cy.get('body')
    cy.get('[data-cy=chapter-checkbox]').first().trigger('keyup', { key: '/' });
    cy.focused().should('have.id', 'search-bar');
    cy.get('[data-cy=search-input]').should('be.empty');
  });

  it('should only show table rows that include the searched text', () => {
    const searchText = 'threat model';

    cy.get('[data-cy=search-input]').type(searchText);
    //Loop through every table row
    cy.get('[data-cy=asvs-list-item].true').each((row) => {
      //Check if at least one table cell has the searched text
      const rowContainsSearchText = Cypress.$(row)
        .find('td:not(.hidden)')
        .toArray()
        .some((td) => td.textContent.toLowerCase().includes(searchText));

      cy.wrap(rowContainsSearchText).should('be.true');
    });
  });
});

