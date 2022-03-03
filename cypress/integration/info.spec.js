describe('Info', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders the info button', () => {
    cy.contains('?');
    cy.get('[type="button"]').contains('?').should('have.length', 1);
  });

  it('renders the modal on button click', () => {
    cy.get('[type="button"]').contains('?').click();
    cy.contains('tote (time + quote) displays a changing background color');
  });

  it('exits the modal when clicking outside', () => {
    cy.get('[type="button"]').contains('?').click();
    cy.contains('tote (time + quote) displays a changing background color');

    cy.clickOutside();
    cy.contains(
      'tote (time + quote) displays a changing background color'
    ).should('not.exist');
  });
});
