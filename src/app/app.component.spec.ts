import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { ComponentFixture } from '@angular/core/testing';
import { of } from 'rxjs';


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let apiService: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user data when searchUser() is called', () => {
    const username = 'testuser';
    const mockUser = { login: 'testuser', name: 'Test User', avatar_url: 'test-avatar-url', html_url: 'test-html-url', bio: 'Test bio', location: 'Test location', twitter_username: 'test_twitter' };

    spyOn(apiService, 'getUser').and.returnValue(of(mockUser));

    component.searchUsername = username;
    component.searchUser();

    expect(apiService.getUser).toHaveBeenCalledWith(username);
    expect(component.user).toEqual(mockUser);
  });

  it('should fetch repositories when searchUser() is called', () => {
    const username = 'testuser';
    const mockRepositories = [{ name: 'repo1', description: 'Test repo 1', languages: ['TypeScript', 'HTML'] }, { name: 'repo2', description: 'Test repo 2', languages: ['JavaScript', 'CSS'] }];

    spyOn(apiService, 'getUser').and.returnValue(of({ login: username }));
    spyOn(apiService, 'getUserRepositories').and.returnValue(of(mockRepositories));

    component.searchUsername = username;
    component.searchUser();

    expect(apiService.getUserRepositories).toHaveBeenCalledWith(username, component.currentPage, component.pageSize);
    expect(component.repositories).toEqual(mockRepositories);
  });

});
