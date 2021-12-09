describe('ngbs', () => {
  beforeEach(() => cy.visit('/iframe.html?id=appcomponent--primary'));
  it('should render the component', () => {
    cy.get('ngbs-root').should('exist');
  });
});