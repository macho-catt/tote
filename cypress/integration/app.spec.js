describe('App', () => {
  it('should load the app and show content', () => {
    cy.visit('/');
    cy.contains('Hex color:');
    cy.contains('Luminance:');
  });
});
