import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { User } from './models/user.model';
import { Repository } from './models/repository.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'fyle-frontend-challenge';
  user: User | undefined;
  repositories: Repository[] = [];
  currentPage = 1;
  pageSize = 10;
  searchUsername = '';
  searchPerformed = false;
  isLoading = new BehaviorSubject<boolean>(false);

  constructor(private apiService: ApiService) {}

  ngOnInit() {}

  searchUser() {
    this.searchPerformed = true;
    if (!this.searchUsername.trim()) {
      return;
    }

    this.isLoading.next(true);
    this.apiService.getUser(this.searchUsername).subscribe(
      (user) => {
        this.user = user;
        this.getRepositories(this.searchUsername);
        console.log(user);
        this.isLoading.next(false);
      },
      (error) => {
        console.error('Error fetching user:', error);
        this.user = undefined;
        this.repositories = [];
        this.isLoading.next(false);
      }
    );
  }

  getRepositories(username: string) {
    this.isLoading.next(true);
    this.apiService.getUserRepositories(username, this.currentPage, this.pageSize).subscribe(
      (repositories) => {
        this.repositories = repositories;
        this.isLoading.next(false);
      },
      (error) => {
        console.error('Error fetching repositories:', error);
        this.repositories = [];
        this.isLoading.next(false);
      }
    );
  }

  toArray(obj: { [key: string]: any }) {
    return Object.keys(obj).map((key) => ({ key: key, value: obj[key] }));
  }

  onPageChange(page: number) {
    this.currentPage = page;
    if (this.user?.login) {
      this.getRepositories(this.user.login);
    }
  }
}