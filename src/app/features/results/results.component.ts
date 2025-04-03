import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GithubService } from '../../core/services/github.service';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { User } from '../../core/models/user.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatPaginatorModule
  ],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  providers: [GithubService],
})
export class ResultsComponent implements OnInit {
  users: User[] = [];
  paginatedUsers: User[] = [];
  searchQuery: string = '';
  loading: boolean = false;
  error: string = '';
  totalResults: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;
  sortBy: string = 'followers-desc';

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
    if (!this.searchQuery.trim()) return;
  
    this.loading = true;
    this.error = '';
  
    this.githubService.searchUsers(this.searchQuery, this.pageIndex + 1, this.pageSize)
      .subscribe({
        next: (response) => {
          if (response && Array.isArray(response.items)) {
            const usersList = response.items;
  
            // Buscar detalhes de cada usuário
            const userDetailsRequests = usersList.map((user: any) =>
              this.githubService.getUserDetails(user.login).toPromise()
            );
  
            Promise.all(userDetailsRequests).then((detailedUsers) => {
              this.users = detailedUsers.map((user: any) => ({
                id: user.id,
                login: user.login,
                name: user.name || user.login,
                avatar_url: user.avatar_url,
                bio: user.bio || 'Nenhuma bio disponível',
                followers: user.followers || 0,
                following: user.following || 0,
                public_repos: user.public_repos || 0,
                location: user.location || 'Desconhecido',
                html_url: user.html_url,
                profile_image: user.avatar_url, // Se necessário
                stars: user.stars || 0,  // Se necessário
                repos: user.repos || []  // Se necessário
              }));
  
              this.totalResults = response.total_count || this.users.length;
              this.sortUsers();  // Aplica a ordenação inicial
              this.loading = false;
            }).catch((error) => {
              this.error = 'Erro ao buscar detalhes dos usuários.';
              console.error('❌ Erro ao buscar detalhes:', error);
              this.loading = false;
            });
  
          } else {
            this.error = 'Resposta inesperada da API.';
            console.error('❌ Resposta inesperada:', response);
            this.loading = false;
          }
        },
        error: (err) => {
          console.error('❌ Erro ao buscar usuários:', err);
          this.error = 'Erro ao buscar usuários. Tente novamente mais tarde.';
          this.loading = false;
        }
      });
  }
  
  
  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    this.router.navigate([], {
      queryParams: { q: this.searchQuery, page: this.pageIndex + 1 },
      queryParamsHandling: 'merge',
    });

    this.updatePaginatedUsers();
  }

  sortUsers() {
    if (this.sortBy === 'followers-desc') {
      this.users.sort((a, b) => b.followers - a.followers);
    } else if (this.sortBy === 'followers-asc') {
      this.users.sort((a, b) => a.followers - b.followers);
    } else if (this.sortBy === 'name-asc') {
      this.users.sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.sortBy === 'name-desc') {
      this.users.sort((a, b) => b.name.localeCompare(a.name));
    } else if (this.sortBy === 'stars-asc') {
      this.users.sort((a, b) => (a.stars ?? 0) - (b.stars ?? 0));
    } else if (this.sortBy === 'stars-desc') {
      this.users.sort((a, b) => (b.stars ?? 0) - (a.stars ?? 0));
    }
  
    // Atualiza a exibição de usuários paginados após a ordenação
    this.updatePaginatedUsers();
  }
  

  updatePaginatedUsers() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedUsers = this.users.slice(startIndex, endIndex);
  }

  goToRepository(login: string) {
    this.router.navigate(['/repository', login]);
  }
}
