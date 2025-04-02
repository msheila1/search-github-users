import { Routes } from '@angular/router';
import { ResultsComponent } from './features/results/results.component';
import { RepositoryDetailsComponent } from './features/repository-details/repository-details.component';
import { SearchComponent } from './features/search/search.component';

export const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' }, // Redireciona para a busca ao carregar a página
  { path: 'search', component: SearchComponent }, // Página de busca
  { path: 'results', component: ResultsComponent }, // Página de resultados
  { path: 'repository/:owner/:repo', component: RepositoryDetailsComponent }
, // Página de detalhes do repositório
  { path: '**', redirectTo: 'search' } // Redireciona rotas inválidas para a busca
];
