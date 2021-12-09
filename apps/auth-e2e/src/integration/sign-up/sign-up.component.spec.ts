describe('auth', () => {
  beforeEach(() => cy.visit('/iframe.html?id=signupcomponent--primary'));
  it('should render the component', () => {
    cy.get('ngbs-sign-up').should('exist');
  });
});