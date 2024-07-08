import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MoviesService]
    });
    service = TestBed.inject(MoviesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve movies', () => {
    const mockMovies = [{ id: 1, year: 1980, title: "Can't Stop the Music", studios: ["Associated Film Distribution"], producers: ["Allan Carr"], winner: true }];

    service.getMovies({ winner: true, year: 1980 }).subscribe(movies => {
      expect(movies).toEqual(mockMovies);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}?winner=true&year=1980`);
    expect(req.request.method).toBe('GET');
    req.flush(mockMovies);
  });
});
