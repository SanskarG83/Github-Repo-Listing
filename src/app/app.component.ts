import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { User } from './models/user.model';
import { Repository } from './models/repository.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user: User | undefined;
  repositories: Repository[] = [];
  currentPage = 1;
  pageSize = 10;
  searchUsername = '';
  searchPerformed: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    // You may choose to fetch user data and repositories for a default username here
  }

  searchUser() {
    this.searchPerformed = true; // Update the searchPerformed flag
    if (!this.searchUsername.trim()) {
      return;
    }
    
    this.apiService.getUser(this.searchUsername).subscribe(user => {
      this.searchPerformed = false;
      this.user = user;
      this.getRepositories(this.searchUsername);
      console.log(user);
    }, error => {
      console.error('Error fetching user:', error);
      this.user = undefined;
      this.repositories = [];
    });
  }

  getRepositories(username: string) {
    this.apiService.getUserRepositories(username, this.currentPage, this.pageSize)
      .subscribe(repositories => {
        this.repositories = repositories;
      }, error => {
        console.error('Error fetching repositories:', error);
        this.repositories = [];
      });
  }


  toArray(obj: { [key: string]: any }) {
    return Object.keys(obj).map(key => ({ key: key, value: obj[key] }));
  }
  
  // getBio(){
  //   if (!this.user?.login) {
  //     console.warn("User login is not available.");
  //     return;
  //   }
  
  //   this.apiService.getUserBio(this.user.login).subscribe(
  //     bio => {
  //       if (this.user) {
  //         this.user.bio = bio;
  //       }
  //     },
  //     error => {
  //       console.error('Error fetching user bio:', error);
  //     }
  //   );
  // }
  

  onPageChange(page: number) {
    this.currentPage = page;
    this.getRepositories(this.user!.login);
  }


}
