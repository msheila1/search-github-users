import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { routes } from './app.routes';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HttpClientModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `,
})
export class AppComponent {}

bootstrapApplication(AppComponent, {
  providers: RouterModule.forRoot(routes).providers ?? [],
});
