import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { User } from '../models/user.model';
import { Repository } from '../models/repository.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getUser(username: string): Observable<User> {
    return this.http.get<User>(`https://api.github.com/users/${username}`);
  }

  getUserRepositories(username: string, page: number, pageSize: number): Observable<Repository[]> {
    const url = `https://api.github.com/users/${username}/repos?page=${page}&per_page=${pageSize}`;
    return this.http.get<any[]>(url).pipe(
      mergeMap(repos =>
        // Fetch languages for each repository
        forkJoin(repos.map(repo => 
          this.getRepositoryLanguages(username, repo.name).pipe(
            map(languages => ({
              id: repo.id,
              name: repo.name,
              description: repo.description,
              languages: languages
            }))
          )
        ))
      )
    );
  }

  getRepositoryLanguages(username: string, repoName: string): Observable<{ [key: string]: number }> {
    const url = `https://api.github.com/repos/${username}/${repoName}/languages`;
    return this.http.get<{ [key: string]: number }>(url);
  }
}
