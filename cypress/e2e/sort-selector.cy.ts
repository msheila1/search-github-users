describe('Sort Selector Component', () => {
    beforeEach(() => {
      cy.visit('/results');
      cy.wait(500);
    });
  
    it('Deve renderizar o componente corretamente', () => {
      cy.get('[data-cy="sort-field"]').should('exist').and('be.visible');
    });
  
    it('Deve exibir todas as opções de ordenação', () => {
      cy.get('[data-cy="sort-select"]').should('exist').click();
      cy.get('[data-cy="sort-followers-desc"]').should('be.visible');
      cy.get('[data-cy="sort-followers-asc"]').should('be.visible');
      cy.get('[data-cy="sort-name-asc"]').should('be.visible');
      cy.get('[data-cy="sort-name-desc"]').should('be.visible');
      cy.get('[data-cy="sort-stars-asc"]').should('be.visible');
      cy.get('[data-cy="sort-stars-desc"]').should('be.visible');
    });
  
    it('Deve permitir a seleção de uma opção de ordenação', () => {
      cy.get('[data-cy="sort-select"]').click();
      cy.get('[data-cy="sort-name-asc"]').click();
      cy.get('[data-cy="sort-select"]').should('contain', 'Nome (A-Z)');
    });
  
    it('Deve emitir evento ao alterar a ordenação', () => {
      cy.get('[data-cy="sort-select"]').click();
      cy.get('[data-cy="sort-stars-desc"]').click();
      cy.get('[data-cy="sort-select"]').should('contain', 'Estrelas (Mais)');
    });
  });
  