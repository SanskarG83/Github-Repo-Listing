import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { User } from '../models/user.model';
import { Repository } from '../models/repository.model';
import { environment_local } from '../environments/environment.local';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private clientId = environment_local.clientId; //here use your own Github client ID and Secret by creating Github Auth app
  private clientSecret = environment_local.clientSecret;

  constructor(private http: HttpClient) {}

  getUser(username: string): Observable<User> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(this.clientId + ':' + this.clientSecret)
    });
    return this.http.get<User>(`https://api.github.com/users/${username}`, { headers: headers });
  }

  getUserRepositories(username: string, offset: number, limit: number): Observable<Repository[]> {
    const url = `https://api.github.com/users/${username}/repos?page=${offset}&per_page=${limit}`;
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(this.clientId + ':' + this.clientSecret)
    });
    return this.http.get<any[]>(url, { headers: headers }).pipe(
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
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(this.clientId + ':' + this.clientSecret)
    });
    return this.http.get<{ [key: string]: number }>(url, { headers: headers });
  }
}
