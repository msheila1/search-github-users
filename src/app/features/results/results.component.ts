import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { GithubService } from '../../core/services/github.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { User } from '../../core/models/user.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { SortSelectorComponent } from '../../core/components/sort-selector/sort-selector.component';
import { PaginationComponent } from '../../core/components/pagination/pagination.component';

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
    RouterModule,
    SortSelectorComponent,
    PaginationComponent 
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
        this.pageSize = params['pageSize'] ? +params['pageSize'] : 10;
        this.sortBy = params['sortBy'] || 'followers-desc'; 
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
        next: async (response) => {
          if (response && Array.isArray(response.items)) {
            const usersList = response.items;

            try {
              const userDetailsResponses = await Promise.allSettled(
                usersList.map((user: any) => this.githubService.getUserDetails(user.login).toPromise())
              );

              this.users = userDetailsResponses
                .filter(result => result.status === 'fulfilled')
                .map((result: any) => {
                  const user = result.value;
                  return {
                    id: user.id,
                    username: user.name || user.login,
                    login: user.login,
                    name: user.name || user.login,
                    avatar_url: user.avatar_url,
                    bio: user.bio || 'Nenhuma bio disponível',
                    followers: user.followers || 0,
                    following: user.following || 0,
                    public_repos: user.public_repos || 0,
                    location: user.location || 'Desconhecido',
                    html_url: user.html_url,
                    profile_image: user.avatar_url,
                    stars: user.stars || 0,
                    repos: user.repos || [],
                  };
                });

              this.totalResults = response.total_count || this.users.length;
              this.sortUsers();
              this.loading = false;
            } catch (error) {
              this.error = 'Erro ao buscar detalhes dos usuários.';
              console.error('❌ Erro ao buscar detalhes:', error);
              this.loading = false;
            }
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
  
    const queryParams: Params = {
      q: this.searchQuery,
      page: event.pageIndex + 1,
      pageSize: this.pageSize, // Atualiza automaticamente
      sortBy: this.sortBy
    };
  
    this.router.navigate(['/results'], { queryParams });
  }
  
  onSortChange(newSort: string) {
    this.sortBy = newSort;
    this.sortUsers();

    this.router.navigate([], { 
      queryParams: { q: this.searchQuery, page: 1, pageSize: this.pageSize, sortBy: this.sortBy },
      queryParamsHandling: 'merge'
    });
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

    this.updatePaginatedUsers();
  }

  updatePaginatedUsers() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedUsers = this.users.slice(startIndex, endIndex);
  }

  goToRepository(username: string) {
    this.router.navigate([`/repository`, username]);
  }
}
