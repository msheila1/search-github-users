import { Routes } from '@angular/router';
import { SearchComponent } from './features/search/search.component';
import { ResultsComponent } from './features/results/results.component';
import { RepositoryDetailComponent } from './features/repository-details/repository-details.component';

export const routes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'results', component: ResultsComponent },
  { path: 'repository/:login', component: RepositoryDetailComponent }, // ✅ Essa rota deve existir!
  { path: '**', redirectTo: '' }
];
