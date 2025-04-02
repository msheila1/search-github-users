// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { GithubService } from '../../core/services/github.service';

// @Component({
//   selector: 'app-repository-details',
//   standalone: true,
//   templateUrl: './repository-details.component.html',
//   styleUrls: ['./repository-details.component.scss']
// })
// export class RepositoryDetailsComponent implements OnInit {
//   repository: any;
//   loading: boolean = false;
//   error: string = '';

//   constructor(
//     private route: ActivatedRoute,
//     private githubService: GithubService
//   ) {}

//   ngOnInit() {
//     const owner = this.route.snapshot.paramMap.get('owner');
//     const repo = this.route.snapshot.paramMap.get('repo');

//     if (owner && repo) {
//       this.fetchRepositoryDetails(owner, repo);
//     } else {
//       this.error = 'Repositório não encontrado!';
//     }
//   }

//   fetchRepositoryDetails(owner: string, repo: string) {
//     this.loading = true;
//     this.githubService.getRepositoryDetails(owner, repo).subscribe({
//       next: (data) => {
//         this.repository = data;
//         this.loading = false;
//       },
//       error: () => {
//         this.error = 'Erro ao carregar os detalhes do repositório.';
//         this.loading = false;
//       }
//     });
//   }
// }
