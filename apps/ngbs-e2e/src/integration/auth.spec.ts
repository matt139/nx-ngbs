describe('Auth', () => {
  const email = `${new Date().valueOf()}@example.com`
  describe('sign up with email and password', () => {
    it('sign up with email and password', () => {
      cy.visit('/auth/sign-up')
      cy.getBySel('avatar-img').should(
        'have.attr',
        'src',
        '/assets/logged-out.svg'
      )
      cy.getBySel('sign-up-input-email').type(email)
      cy.getBySel('sign-up-input-password').type('password')
      cy.getBySel('sign-up-input-password-confirm').type('password')
      cy.getBySel('sign-up-button-submit').click()
      cy.getBySel('avatar-img').should(
        'have.attr',
        'src',
        '/assets/logged-in.svg'
      )
    })

    it('log out', () => {
      cy.getBySel('avatar-img').click()
      cy.getBySel('avatar-link-log-out').click()
      cy.getBySel('avatar-img').should(
        'have.attr',
        'src',
        '/assets/logged-out.svg'
      )
    })

    it('log in', () => {
      cy.getBySel('avatar-img').should(
        'have.attr',
        'src',
        '/assets/logged-out.svg'
      )
      cy.getBySel('avatar-img').click()
      cy.getBySel('avatar-link-log-in').click()
      cy.getBySel('log-in-form-input-email').type(email)
      cy.getBySel('log-in-form-input-password').type('password')
      cy.getBySel('log-in-form-button-submit').click()
      cy.getBySel('avatar-img').should(
        'have.attr',
        'src',
        '/assets/logged-in.svg'
      )
    })
  })
})
