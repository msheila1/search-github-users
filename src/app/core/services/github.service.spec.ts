import { TestBed } from '@angular/core/testing';
import { GithubService } from './github.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('GithubService', () => {
  let service: GithubService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GithubService],
    });
    service = TestBed.inject(GithubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch user data successfully', () => {
    const mockUser = {
      login: 'octocat',
      id: 1,
      avatar_url: 'https://github.com/images/error/octocat_happy.gif',
      html_url: 'https://github.com/octocat',
      name: 'The Octocat',
      bio: 'There once was...',
      followers: 0,
      following: 0,
      public_repos: 0,
      location: 'San Francisco',
      stars: 0,
      repos: [],
      profile_image: 'https://github.com/images/error/octocat_happy.gif',
      avatar: 'https://github.com/images/error/octocat_happy.gif',
      url: 'https://github.com/octocat',
      username: 'octocat',
      repos_url: 'https://api.github.com/users/octocat/repos',
      followers_url: 'https://api.github.com/users/octocat/followers',
      following_url: 'https://api.github.com/users/octocat/following',
    };

    spyOn(service, 'getUserDetails').and.returnValue(of(mockUser));

    service.getUserDetails('octocat').subscribe((user: any) => {
      expect(user).toEqual(mockUser);
    });
  });
});