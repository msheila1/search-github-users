describe('SearchComponent', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.wait(500);
  });

  it('Deve permanecer na página inicial se a pesquisa for vazia', () => {
    cy.get('[data-cy="search-input"]').clear();
    cy.get('[data-cy="search-button"]').click();

    cy.wait(500);
    cy.url().should('eq', Cypress.config('baseUrl') || 'http://localhost:4200/');
  });

  it('Deve redirecionar para a página de resultados ao buscar', () => {
    cy.get('[data-cy="search-input"]').type('torvalds');
    cy.get('[data-cy="search-button"]').click();
    cy.wait(500);
    cy.url().should('include', '/results?q=torvalds&page=1');
  });
});
