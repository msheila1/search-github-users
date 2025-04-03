import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'; // Certifique-se de que o environment está configurado corretamente
import { GithubUser } from '../github-user.model';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private readonly API_URL = 'https://api.github.com';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${environment.githubToken}`, // Usa o token do environment
      Accept: 'application/vnd.github.v3+json',
    });
  }

  /**
   * Busca usuários no GitHub com base no termo de pesquisa.
   * @param query Nome do usuário
   * @param page Número da página
   * @param pageSize Itens por página
   * @returns Observable com a lista de usuários
   */
  searchUsers(query: string, page: number, pageSize: number): Observable<any> {
    const url = `${this.API_URL}/search/users?q=${query}&page=${page}&per_page=${pageSize}`;
    return this.http.get<any>(url, { headers: this.getHeaders() });
  }

  /**
   * Obtém os detalhes de um usuário do GitHub.
   * @param username Nome do usuário no GitHub
   * @returns Observable com os detalhes do usuário
   */
  getUserDetails(username: string): Observable<GithubUser> {
    return this.http.get<GithubUser>(`${this.API_URL}/users/${username}`, { headers: this.getHeaders() });
  }
  

  /**
   * Obtém os repositórios públicos de um usuário no GitHub.
   * @param owner Nome do usuário no GitHub
   * @returns Observable com a lista de repositórios
   */
  getUserRepositories(username: string) {
    return this.http.get<any[]>(`https://api.github.com/users/${username}/repos`);
  }  
  
  /**
   * Obtém detalhes de um repositório específico.
   * @param owner Nome do dono do repositório
   * @param repo Nome do repositório
   * @returns Observable com os detalhes do repositório
   */
  getRepositoryDetails(owner: string, repo: string): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/repos/${owner}/${repo}`, { headers: this.getHeaders() });
  }
}
