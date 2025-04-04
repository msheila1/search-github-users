# 🔍 SearchGithubUser

SearchGithubUser é uma aplicação desenvolvida com Angular 19 e Angular Material que permite buscar usuários e repositórios do GitHub. A interface é responsiva e a navegação flui entre páginas de busca, listagem de resultados e detalhes dos repositórios.

## 📦 Tecnologias Utilizadas

- [Angular CLI 19.2.5](https://github.com/angular/angular-cli)
- [Angular Material](https://material.angular.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [RxJS](https://rxjs.dev/)
- [SCSS](https://sass-lang.com/)
- [Jasmine + Karma](https://karma-runner.github.io/latest/index.html) (testes unitários)
- [Protractor ou Cypress](https://www.cypress.io/) (testes E2E)

---

## 🚀 Instalação e Execução

1. **Clone o repositório:**

```bash
git clone https://github.com/msheila1/search-github-user.git
cd search-github-user
```

2. **Instale as dependências:**

```bash
npm install
```

3. **Execute o servidor de desenvolvimento:**

```bash
ng serve
```

Acesse: [http://localhost:4200](http://localhost:4200)

---

## 🧭 Funcionalidades

- ✅ Página inicial com campo de busca por nome de usuário
- ✅ Listagem de repositórios com paginação e ordenação (por estrelas, data de criação etc.)
- ✅ Página de detalhes com informações completas do repositório selecionado
- ✅ Layout responsivo e acessível (WCAG)
- ✅ Tratamento de erros (usuário não encontrado, falhas de rede etc.)

---

## 📁 Estrutura de Pastas

```
src/
├── app/
│   ├── components/
│   ├── pages/
│   │   ├── search/
│   │   ├── results/
│   │   └── repository-detail/
│   ├── services/
│   ├── models/
│   └── app-routing.module.ts
├── assets/
└── environments/
```

---

## 🧪 Testes

### Testes Unitários

Execute os testes unitários com Karma:

```bash
ng test
```

### Testes End-to-End

Execute os testes e2e com:

```bash
ng e2e
```

> Caso esteja utilizando Cypress, utilize o comando `npx cypress open` ou `npx cypress run`.

---

## ⚙️ Build de Produção

Para compilar o projeto para produção:

```bash
ng build --configuration production
```

Os artefatos gerados estarão disponíveis na pasta `dist/`.

---

## 🔗 Integrações

- API oficial do GitHub: [https://api.github.com](https://api.github.com)

---

## 📌 Requisitos para Contribuir

1. Fork este repositório
2. Crie uma branch com sua feature: `git checkout -b feature/nome-da-feature`
3. Commit suas mudanças: `git commit -m 'Adiciona nova feature'`
4. Push para o branch: `git push origin feature/nome-da-feature`
5. Crie um Pull Request

---

## 👩‍💻 Desenvolvido por

**Maria Sheila Carneiro**  
PhD. MSc in IT and Knowledge Management  
Software Engineer | Frontend Developer | Engineering Manager | Tech Lead | Data Scientist and Researcher

- 🌐 [LinkedIn](https://www.linkedin.com/in/sheilascarneiro/)  
- 💻 [GitHub](https://github.com/msheila1)

---

## 📃 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
