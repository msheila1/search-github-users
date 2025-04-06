import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GithubService } from '../../core/services/github.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-repository-details',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  templateUrl: './repository-details.component.html',
  styleUrls: ['./repository-details.component.scss'],
  providers: [GithubService]
})
export class RepositoryDetailsComponent implements OnInit {
  username: string = '';
  repositories: any[] = [];
  loading: boolean = false;
  error: string = '';

  constructor(private route: ActivatedRoute, private githubService: GithubService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.username = params['username'];
      if (this.username) {
        this.fetchRepositories();
      }
    });
  }

  fetchRepositories() {
    this.loading = true;
    this.error = '';

    this.githubService.getUserRepositories(this.username).subscribe({
      next: (repos) => {
        console.log('Repositórios carregados:', repos);
        this.repositories = repos || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar repositórios:', err);
        this.error = 'Erro ao carregar repositórios.';
        this.repositories = [];
        this.loading = false;
      }
    });
  }
}