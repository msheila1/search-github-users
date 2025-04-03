import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './features/search/search.component';
import { ResultsComponent } from './features/results/results.component';
import { NgModule } from '@angular/core';
import { RepositoryDetailComponent } from './features/repository-details/repository-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' }, 
  { path: 'search', component: SearchComponent }, 
  { path: 'results', component: ResultsComponent }, 
  { path: 'repository/:username', component: RepositoryDetailComponent }, // Parâmetro correto
  { path: '**', redirectTo: 'search' } 
];