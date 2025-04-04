describe('Footer', () => {
    it('deve estar visível e exibir o ano atual com o texto correto', () => {
      cy.visit('/');
  
      const currentYear = new Date().getFullYear();
  
      cy.get('mat-toolbar.footer-toolbar')
        .should('be.visible')
        .and('contain.text', `© ${currentYear} Search GitHub User - Todos os direitos reservados.`);
    });
  });  