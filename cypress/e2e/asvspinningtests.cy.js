// For autocompletion
/// <reference types="Cypress" />

describe('Pin items', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('should have no pinned items initially and not show component', () => {
    cy.contains('Pinned items').should('not.exist');
    cy.window().then((w) => {
      const value = w.localStorage.getItem('pinned-items');
      expect(value).to.be.null;
    });
  });

  it('should show all pinned items in localstorage', () => {
    cy.window().then((w) => {
      //Set two items in localstorage manually
      w.localStorage.setItem(
        'pinned-items',
        JSON.stringify([
          {
            chapter_id: 'V1',
            chapter_name: 'Architecture, Design and Threat Modeling',
            section_id: 'V1.1',
            section_name: 'Secure Software Development Lifecycle',
            req_id: 'V1.1.1',
            req_description:
              'Verify the use of a secure software development lifecycle that addresses security in all stages of development. ([C1](https://owasp.org/www-project-proactive-controls/#div-numbering))',
            level1: '',
            level2: '✓',
            level3: '✓',
            cwe: '',
            nist: '',
          },
          {
            chapter_id: 'V1',
            chapter_name: 'Architecture, Design and Threat Modeling',
            section_id: 'V1.1',
            section_name: 'Secure Software Development Lifecycle',
            req_id: 'V1.1.2',
            req_description:
              'Verify the use of threat modeling for every design change or sprint planning to identify threats, plan for countermeasures, facilitate appropriate risk responses, and guide security testing.',
            level1: '',
            level2: '✓',
            level3: '✓',
            cwe: '1053',
            nist: '',
          },
        ])
      );
    });
    cy.contains('Pinned items');
    cy.get('[data-cy=asvs-pin]').should('have.length', 2);
  });

  it('should add item to localstorage and the page with button in asvs list', () => {
    cy.get('[data-cy=asvs-list-pin]').first().click();
    cy.window().then((w) => {
      const value = w.localStorage.getItem('pinned-items');
      expect(JSON.parse(value)).have.length(1);
    });
  });

  it('should remove item from localstorage and the page', () => {
    //First click adds item to localstorage, second time it should remove.
    cy.get('[data-cy=asvs-list-pin]').first().click();
    cy.get('[data-cy=asvs-list-pin]').first().click();
    cy.window().then((w) => {
      const value = w.localStorage.getItem('pinned-items');
      expect(JSON.parse(value)).have.length(0);
    });
  });
});
