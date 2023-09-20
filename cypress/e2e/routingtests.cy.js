describe('Visit tips page', () => {
    it('clicks the button "Tips"', () => {
        cy.visit("localhost:5173")

        cy.contains('Tips').click()

        // Should be on a new URL which
        // includes '/tips'
        cy.url().should('include', '/tips')
    })
})

describe('Visit home page', () => {
    it('clicks the button "Home"', () => {
        cy.visit("localhost:5173/tips")

        cy.contains('Home').click()

        // Should be on a new URL which
        // includes '/'
        cy.url().should('include', '/')
    })
})
