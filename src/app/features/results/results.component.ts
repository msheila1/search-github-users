import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GithubService } from '../../core/services/github.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { User } from '../../core/models/user.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select'; // Importação corrigida

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatPaginator,
    MatFormFieldModule,
    MatSelectModule, // Adicionado para funcionar o mat-select
  ],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  users: User[] = [];
  searchQuery: string = '';
  loading: boolean = false;
  error: string = '';
  totalResults: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;
  sortBy: string = 'followers-desc'; // Ordenação padrão

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private githubService: GithubService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['q']) {
        this.searchQuery = params['q'].trim();
        this.pageIndex = params['page'] ? +params['page'] - 1 : 0;
        this.fetchUsers();
      }
    });
  }

  fetchUsers() {
    if (!this.searchQuery.trim()) {
      console.warn('⚠️ Consulta vazia, busca não será feita.');
      return;
    }

    this.loading = true;
    this.error = '';

    console.log('🔍 Buscando usuários para:', this.searchQuery);

    this.githubService
      .searchUsers(this.searchQuery, this.pageIndex + 1, this.pageSize)
      .subscribe({
        next: (users) => {
          console.log('🔹 API Response:', users);
          this.users = users;
          this.totalResults = users.length;
          this.sortUsers(); // Aplica ordenação ao receber os dados
          this.loading = false;
        },
        error: (err) => {
          console.error('❌ Erro ao buscar usuários:', err);
          this.error = 'Erro ao buscar usuários. Tente novamente mais tarde.';
          this.loading = false;
        },
      });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    this.router.navigate([], {
      queryParams: { q: this.searchQuery, page: this.pageIndex + 1 },
      queryParamsHandling: 'merge',
    });

    this.fetchUsers();
  }

  sortUsers() {
    if (!this.users) return;

    switch (this.sortBy) {
      case 'name-asc':
        this.users.sort((a, b) => (a.name || a.login).localeCompare(b.name || b.login));
        break;
      case 'name-desc':
        this.users.sort((a, b) => (b.name || b.login).localeCompare(a.name || a.login));
        break;
      case 'followers-asc':
        this.users.sort((a, b) => a.followers - b.followers);
        break;
      case 'followers-desc':
        this.users.sort((a, b) => b.followers - a.followers);
        break;
    }
  }
}
