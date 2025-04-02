import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class GithubService {
  private baseUrl = 'https://api.github.com/search/users';
  private userDetailsUrl = 'https://api.github.com/users';

  constructor(private http: HttpClient) {}

  searchUsers(query: string, page: number, pageSize: number): Observable<User[]> {
    const url = `${this.baseUrl}?q=${query}&page=${page}&per_page=${pageSize}`;
    
    return this.http.get<{ items: any[] }>(url).pipe(
      switchMap((response) => {
        const userRequests = response.items.map((user) => 
          this.getUserDetails(user.login)
        );
        return forkJoin(userRequests);
      })
    );
  }

  getUserDetails(username: string): Observable<User> {
    return this.http.get<any>(`${this.userDetailsUrl}/${username}`).pipe(
      map(user => ({
        id: user.id,
        login: user.login,
        name: user.name || user.login,
        bio: user.bio || 'Sem biografia disponível',
        followers: user.followers || 0,
        following: user.following || 0,
        public_repos: user.public_repos || 0,
        location: user.location || 'Localização não informada',
        avatar_url: user.avatar_url
      }))
    );
  }
}
