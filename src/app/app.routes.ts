import { Routes } from '@angular/router';
import { SearchComponent } from './features/search/search.component';
import { ResultsComponent } from './features/results/results.component';

export const routes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'results', component: ResultsComponent },
  // {  path: 'repository/:owner/:repo', component: RepositoryDetailsComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
