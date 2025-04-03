import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GithubService } from '../../core/services/github.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Repository } from '../../core/models/repository.model';

@Component({
  selector: 'app-repository-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './repository-details.component.html',
  styleUrls: ['./repository-details.component.scss'],
  providers: [GithubService]
})
export class RepositoryDetailComponent implements OnInit {
  repository: Repository | null = null;
  login: string = '';
  loading: boolean = false;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private githubService: GithubService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.login = params.get('login') || '';
      console.log('🔹 Login recebido na URL:', this.login);

      if (this.login) {
        this.fetchRepository();
      } else {
        this.error = 'Usuário não encontrado!';
      }
    });
  }

  fetchRepository() {
    this.loading = true;
    this.error = '';

    this.githubService.getUserRepositories(this.login).subscribe({
      next: (repos) => {
        console.log('🔹 Repositórios encontrados:', repos);
        if (repos.length > 0) {
          this.repository = repos[0];
        } else {
          this.error = 'Nenhum repositório encontrado.';
          this.repository = null;
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Erro ao buscar repositórios:', err);
        this.error = 'Erro ao carregar os repositórios.';
        this.repository = null;
        this.loading = false;
      }
    });
  }
  openRepositoryUrl(url: string) {
    window.open(url, '_blank');
  }
}
