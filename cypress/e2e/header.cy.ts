describe('HeaderComponent', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('Deve exibir o header corretamente', () => {
      cy.get('app-header').should('be.visible');
    });
  
    it('Deve conter os botões "Home" e "Buscar"', () => {
        cy.get('[data-cy="btn-home"]').should('be.visible');
        cy.get('[data-cy="btn-search"]').should('be.visible');
      });      
  
      it('Deve navegar para a página inicial ao clicar no botão "Home"', () => {
        cy.contains('button', 'Home').click();
        cy.url().should('include', '/');
      });      
  
    it('Deve navegar para a página de busca ao clicar no botão "Buscar"', () => {
      cy.contains('button', 'Buscar').click();
      cy.url().should('include', '/search');
    });
  });
  