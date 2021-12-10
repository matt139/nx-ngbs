describe('utils', () => {
  beforeEach(() => cy.visit('/iframe.html?id=selectstylesheetcomponent--primary'));
  it('should render the component', () => {
    cy.get('ngbs-select-stylesheet').should('exist');
  });
});