describe('Resultados da Busca', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/users/*/repos').as('getRepositories');
        cy.visit('/results?q=torvalds&page=1');
        cy.wait('@getRepositories', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
    });

    it('Deve exibir a lista de repositórios corretamente', () => {
        cy.get('[data-cy="user-card"]').should('have.length.greaterThan', 0);
    });

    it('Deve exibir o nome do usuário e a quantidade de seguidores', () => {
        cy.get('[data-cy="user-card"]').first().within(() => {
            cy.get('[data-cy="user-name"]').should('exist');
            cy.get('[data-cy="user-followers"]').should('exist');
        });
    });

    it('Deve exibir uma mensagem de erro quando a API falhar', () => {
        cy.intercept('GET', '**/users/*/repos', { statusCode: 500 }).as('getRepositoriesError');
        cy.visit('/results?q=torvalds&page=1');
        cy.wait('@getRepositoriesError', { timeout: 10000 });
        cy.get('[data-cy="error-message"]').should('be.visible').and('contain', 'Erro ao buscar usuários');
    });

    it('Deve exibir um indicador de carregamento antes de carregar os repositórios', () => {
        cy.intercept('GET', '**/users/*/repos', (req) => {
            req.continue((res) => {
                res.setDelay(2000);
            });
        }).as('delayedRepositories');

        cy.visit('/results?q=torvalds&page=1');

        cy.get('[data-cy="loading-spinner"]').should('be.visible');

        cy.wait('@delayedRepositories', { timeout: 10000 });

        cy.get('[data-cy="loading-spinner"]').should('not.exist');
    });

    it('Deve mudar para a segunda página ao clicar no botão de paginação', () => {
        cy.get('.mat-mdc-paginator-navigation-next').should('be.visible').click();
        cy.url().should('include', 'page=2');
    });

    it('Deve navegar para a página de repositórios ao clicar no botão', () => {
        cy.get('[data-cy="repo-button"]').first().click();
        cy.url().should('include', '/repository/');
    });
});
