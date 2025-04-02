import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { provideRouter, Routes } from '@angular/router';
import { SearchComponent } from './app/features/search/search.component';
import { ResultsComponent } from './app/features/results/results.component';


const routes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'results', component: ResultsComponent },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes)
  ]
}).catch((err) => console.error(err));


