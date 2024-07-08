import { TestBed } from '@angular/core/testing';
import { MoviesListComponent } from './movies-list.component';
import { MoviesService } from '../services/movies.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MoviesListComponent', () => {
  let component: MoviesListComponent;
  let fixture: any;
  let moviesService: jasmine.SpyObj<MoviesService>;

  beforeEach(async () => {
    const moviesServiceSpy = jasmine.createSpyObj('MoviesService', ['getMovies']);

    await TestBed.configureTestingModule({
      declarations: [MoviesListComponent],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [{ provide: MoviesService, useValue: moviesServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(MoviesListComponent);
    component = fixture.componentInstance;
    moviesService = TestBed.inject(MoviesService) as jasmine.SpyObj<MoviesService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get movies on init', () => {
    const mockMovies = {
      content: [{ id: 1, year: 1980, title: "Can't Stop the Music", studios: ["Associated Film Distribution"], producers: ["Allan Carr"], winner: true }],
      totalPages: 1
    };
    moviesService.getMovies.and.returnValue(of(mockMovies));

    component.ngOnInit();

    expect(moviesService.getMovies).toHaveBeenCalledWith(10);
    expect(component.movies).toEqual(mockMovies.content);
    expect(component.totalPages).toEqual(mockMovies.totalPages);
  });

  it('should apply filters and update movies', () => {
    const mockMovies = {
      content: [{ id: 1, year: 1980, title: "Can't Stop the Music", studios: ["Associated Film Distribution"], producers: ["Allan Carr"], winner: true }],
      totalPages: 1
    };
    moviesService.getMovies.and.returnValue(of(mockMovies));

    component.filterYear = 1980;
    component.applyFilters();

    expect(moviesService.getMovies).toHaveBeenCalledWith({ page: 0, size: 10, year: 1980 });
    expect(component.movies).toEqual(mockMovies.content);
    expect(component.totalPages).toEqual(mockMovies.totalPages);
  });
});
