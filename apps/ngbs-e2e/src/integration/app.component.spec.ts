describe('ngbs', () => {
  beforeEach(() => cy.visit('/'));
  it('should render the component', () => {
    cy.get('ngbs-root').should('exist');
  });
});
