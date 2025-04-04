describe('PaginationComponent', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.wait(500);
    });
  
    it('deve renderizar o paginador', () => {
      cy.get('#paginator', { timeout: 10000 }).should('exist').should('be.visible');
    });
  
    it('deve mudar de página quando o próximo botão for clicado', () => {
      cy.get('#paginator', { timeout: 10000 }).as('paginator');
      
      cy.get('@paginator').find('button.mat-mdc-paginator-navigation-next').click();
      
      cy.get('@paginator').invoke('attr', 'pageIndex').should('not.equal', '0');
    });
  
    it('deve mudar o tamanho da página', () => {
      cy.get('#paginator', { timeout: 10000 }).as('paginator');
      
      cy.get('@paginator').find('mat-select').click({ force: true });
      cy.wait(500);
      cy.get('.mat-mdc-option').contains('25').click({ force: true });
      
      cy.get('@paginator')
        .find('.mat-mdc-select-value-text')
        .invoke('text')
        .should('contain', '25');
    });
  });
