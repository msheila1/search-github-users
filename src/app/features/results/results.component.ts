import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GithubService } from '../../core/services/github.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { GithubUser } from '../../core/github-user.model';

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
    FormsModule
  ],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  providers: [GithubService],
})
export class ResultsComponent implements OnInit {
  users: GithubUser[] = [];
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
            this.users = response.items.map((user: any) => ({
              login: user.login ?? '',
              avatar_url: user.avatar_url ?? '',
              html_url: user.html_url ?? '',
              followers: user.followers ?? 0,
              following: user.following ?? 0,
              name: user.name ?? '',
              bio: user.bio ?? '',
              location: user.location ?? '',
              public_repos: user.public_repos ?? 0
            }));

            this.totalResults = response.total_count || this.users.length;
            this.sortUsers();
          } else {
            this.error = 'Resposta inesperada da API.';
          }
          this.loading = false;
        },
        error: () => {
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

    this.fetchUsers();
  }

  sortUsers() {
    switch (this.sortBy) {
      case 'name-asc':
        this.users.sort((a, b) => a.login.localeCompare(b.login));
        break;
      case 'name-desc':
        this.users.sort((a, b) => b.login.localeCompare(a.login));
        break;
      case 'followers-asc':
        this.users.sort((a, b) => a.followers - b.followers);
        break;
      case 'followers-desc':
        this.users.sort((a, b) => b.followers - a.followers);
        break;
    }
  }

  navigateToRepository(user: GithubUser) {
    this.router.navigate(['/repository', user.login]);
  }
}
