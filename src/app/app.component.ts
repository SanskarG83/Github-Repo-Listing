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
  searchUsername = ''; // Add a property to store the entered username

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    // You may choose to fetch user data and repositories for a default username here
  }

  searchUser() {
    if (!this.searchUsername.trim()) {
      // If the search username is empty, do nothing
      return;
    }
    
    this.apiService.getUser(this.searchUsername).subscribe(user => {
      this.user = user;
      this.getRepositories(this.searchUsername);
      // this.getBio();
      console.log(user);
    }, error => {
      console.error('Error fetching user:', error);
      this.user = undefined; // Clear user on error
      this.repositories = []; // Clear repositories on error
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
