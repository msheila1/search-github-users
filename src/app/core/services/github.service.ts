import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GithubUser } from '../github-user.model';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private readonly API_URL = 'https://api.github.com';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      //Authorization: `Bearer ${environment.githubToken}`,
      Accept: 'application/vnd.github.v3+json',
    });
  }

  /**
   * Searches for users on GitHub based on your search term.
   * @param query
   * @param page
   * @param pageSize
   * @returns
   */
  searchUsers(query: string, page: number, pageSize: number): Observable<any> {
    const url = `${this.API_URL}/search/users?q=${query}&page=${page}&per_page=${pageSize}`;
    return this.http.get<any>(url, { headers: this.getHeaders() });
  }

  /**
   * Gets the details of a GitHub user.
   * @param username
   * @returns
   */
  getUserDetails(username: string): Observable<GithubUser> {
    return this.http.get<GithubUser>(`${this.API_URL}/users/${username}`, { headers: this.getHeaders() });
  }
  

  /**
   * Gets a user's public repositories on GitHub.
   * @param owner
   * @returns
   */
  getUserRepositories(username: string) {
    return this.http.get<any[]>(`https://api.github.com/users/${username}/repos`);
  }  
  
  /**
   * Get details of a specific repository
   * @param owner
   * @param repo
   * @returns
   */
  getRepositoryDetails(owner: string, repo: string): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/repos/${owner}/${repo}`, { headers: this.getHeaders() });
  }
}
