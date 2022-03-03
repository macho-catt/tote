describe('Quote', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders an initial quote', () => {
    cy.get('[data-testid="currQuote"]').should('be.visible');
  });
});
