import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GithubService } from '../../core/services/github.service';
import { Repository } from '../../core/models/repository.model';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-repository-details',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './repository-details.component.html',
  styleUrls: ['./repository-details.component.scss'],
})
export class RepositoryDetailsComponent implements OnInit {
  repository!: Repository;
  loading: boolean = false;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private githubService: GithubService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const owner = params.get('owner'); // ✅ Certifique-se de que isso está retornando algo
      const repo = params.get('repo');

      if (owner && repo) {
        this.loading = true;
        console.log(`Buscando repositório: ${owner}/${repo}`);

        this.githubService.getRepositoryDetails(owner, repo).subscribe({
          next: (data) => {
            this.repository = data;
            this.loading = false;
          },
          error: (err) => {
            console.error('Erro ao buscar repositório:', err);
            this.error = 'Erro ao carregar os detalhes do repositório.';
            this.loading = false;
          },
        });
      } else {
        this.error = 'Parâmetros inválidos na URL.';
      }
    });
  }
}
