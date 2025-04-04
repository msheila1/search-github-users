describe('Repository Details Page', () => {
    beforeEach(() => {
      cy.intercept('GET', '**/users/*/repos', { fixture: 'repositories.json' }).as('getRepositories');
      cy.visit('/repository/torvalds');
      cy.wait('@getRepositories');
    });
  
    it('Deve exibir a lista de repositórios corretamente', () => {
      cy.get('.repository-card').should('have.length.greaterThan', 0);
    });
  
    it('Deve exibir o nome do repositório e a quantidade de estrelas', () => {
      cy.get('.repository-card').first().within(() => {
        cy.get('.repo-name').should('exist');
        cy.get('.repo-stars').should('exist');
      });
    });
  
    it('Deve exibir uma mensagem de erro quando a API falhar', () => {
      cy.intercept('GET', '**/users/*/repos', { statusCode: 500 }).as('getRepositoriesError');
      cy.visit('/repository/torvalds');
      cy.wait('@getRepositoriesError');
      cy.get('[data-testid="error-message"]').should('be.visible');
      cy.get('[data-testid="error-message"]').should('contain', 'Erro ao carregar repositórios.');
    });
  
    it('Deve exibir um indicador de carregamento antes de carregar os repositórios', () => {
      cy.intercept('GET', '**/users/*/repos', (req) => {
        req.on('response', (res) => {
          res.setDelay(2000);
        });
      }).as('delayedRepositories');
  
      cy.visit('/repository/torvalds');
      cy.get('mat-spinner').should('be.visible');
      cy.wait('@delayedRepositories');
      cy.get('mat-spinner').should('not.exist');
    });
});
