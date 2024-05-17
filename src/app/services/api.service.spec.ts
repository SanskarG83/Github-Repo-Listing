import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user by username', () => {
    const username = 'testUser';
    const dummyUser = { id: 1, login: 'testUser' };

    service.getUser(username).subscribe(user => {
      expect(user).toEqual(dummyUser);
    });

    const req = httpMock.expectOne(`https://api.github.com/users/${username}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUser);
  });

  it('should get user repositories', () => {
    const username = 'testUser';
    const offset = 1;
    const limit = 10;
    const dummyRepos = [{ id: 1, name: 'repo1' }, { id: 2, name: 'repo2' }];

    service.getUserRepositories(username, offset, limit).subscribe(repos => {
      expect(repos.length).toBe(2);
      expect(repos).toEqual(dummyRepos);
    });

    const req = httpMock.expectOne(`https://api.github.com/users/${username}/repos?page=${offset}&per_page=${limit}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyRepos);
  });

  it('should get repository languages', () => {
    const username = 'testUser';
    const repoName = 'repo1';
    const dummyLanguages = { TypeScript: 100, JavaScript: 200 };

    service.getRepositoryLanguages(username, repoName).subscribe(languages => {
      expect(languages).toEqual(dummyLanguages);
    });

    const req = httpMock.expectOne(`https://api.github.com/repos/${username}/${repoName}/languages`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyLanguages);
  });
});

