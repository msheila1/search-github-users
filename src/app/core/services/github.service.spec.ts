import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GithubService } from './github.service';

describe('GithubService', () => {
  let service: GithubService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GithubService],
    });

    service = TestBed.inject(GithubService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica se não há requisições pendentes
  });

  it('deve buscar usuários corretamente', () => {
    const mockResponse = {
      items: [{ id: 1, login: 'octocat', avatar_url: 'https://github.com/images/octocat.png' }]
    };

    service.searchUsers('octocat', 1, 10).subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('https://api.github.com/search/users?q=octocat&page=1&per_page=10');
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse); // Retorna o mock como resposta
  });

  it('deve tratar erros da API corretamente', () => {
    service.searchUsers('octocat', 1, 10).subscribe({
      error: (error) => {
        expect(error.message).toBe('Erro ao buscar os detalhes do usuário.');
      }
    });

    const req = httpMock.expectOne('https://api.github.com/search/users?q=octocat&page=1&per_page=10');
    req.error(new ErrorEvent('Erro de rede'));
  });
});
