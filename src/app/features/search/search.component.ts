import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  searchQuery: string = '';

  constructor(private router: Router) {}

  search() {
    const trimmedQuery = this.searchQuery.trim();
  
    if (trimmedQuery) {
      setTimeout(() => {
        this.router.navigate(['/results'], { queryParams: { q: trimmedQuery, page: 1 } });
      }, 100);
    }
  }  

  goToHome() {
    this.router.navigate(['/']);
  }
}
