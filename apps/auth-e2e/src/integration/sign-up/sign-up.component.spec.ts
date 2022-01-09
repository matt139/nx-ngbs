describe('auth', () => {
  it('should render the component', () => {
    cy.visit('/iframe.html?id=sign-up-form--primary')
    cy.get('ngbs-auth-sign-up-form').should('exist')
  })

  it('should render the component', () => {
    cy.visit('/iframe.html?id=log-in-form--primary')
    cy.get('ngbs-auth-log-in-form').should('exist')
  })
})
